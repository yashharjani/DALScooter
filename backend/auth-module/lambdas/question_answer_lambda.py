import random
import boto3
import os
import logging
import json

dynamodb = boto3.client('dynamodb')
table_name = os.environ['DYNAMODB_TABLE']
logger = logging.getLogger()
logger.setLevel(logging.INFO)

def lambda_handler(event, context):
    logger.info("=== Event Received ===")
    logger.info(json.dumps(event))

    trigger = event.get("triggerSource")
    session = event.get('request', {}).get('session', [])
    user_id = event['userName']
    logger.info(f"Trigger: {trigger}, UserId: {user_id}")
    logger.info(f"Session: {json.dumps(session)}")

    # PHASE 1: DefineAuthChallenge
    if trigger == "DefineAuthChallenge_Authentication":
        event['response'] = {
            'challengeName': 'CUSTOM_CHALLENGE',
            'issueTokens': len(session) == 2 and all(ch.get("challengeResult") for ch in session),
            'failAuthentication': False
        }
        return event

    # PHASE 2: CreateAuthChallenge
    elif trigger == "CreateAuthChallenge_Authentication":
        if len(session) == 0:
            # First challenge — Q&A from DynamoDB
            try:
                response = dynamodb.get_item(
                    TableName=table_name,
                    Key={'userId': {'S': str(user_id)}}
                )
                item = response.get('Item', {})
                question = item['securityQuestion']['S']
                answer = item['securityAnswer']['S']
                event['response'] = {
                    'publicChallengeParameters': {'question': question},
                    'privateChallengeParameters': {'answer': answer},
                    'challengeMetadata': 'QNA_CHALLENGE'
                }
            except Exception as e:
                logger.error("DynamoDB Q&A fetch failed", exc_info=True)
                raise e

        elif len(session) == 1:
            # Second challenge — Caesar cipher
            plain = random.choice(["delta", "train", "mouse"])
            shift = 3
            cipher = ''.join([chr((ord(c) - 97 + shift) % 26 + 97) for c in plain])
            event['response'] = {
                'publicChallengeParameters': {'cipherText': cipher},
                'privateChallengeParameters': {'answer': plain},
                'challengeMetadata': 'CIPHER_CHALLENGE'
            }

        return event

    # PHASE 3: VerifyAuthChallengeResponse
    elif trigger == "VerifyAuthChallengeResponse_Authentication":
        expected = event['request']['privateChallengeParameters']['answer'].strip().lower()
        user_response = event['request']['challengeAnswer'].strip().lower()
        event['response'] = {'answerCorrect': expected == user_response}
        return event

    # Fallback
    logger.warning("Unexpected triggerSource or flow.")
    event['response'] = {
        'issueTokens': False,
        'failAuthentication': True
    }
    return event

# import random
# import boto3
# import os
# import logging
# import json

# dynamodb = boto3.client('dynamodb')
# table_name = os.environ['DYNAMODB_TABLE']
# ssm = boto3.client('ssm')
# sns = boto3.client('sns')

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

# def lambda_handler(event, context):
#     logger.info("=== Event Received ===")
#     logger.info(json.dumps(event))

#     trigger = event.get("triggerSource")
#     session = event.get('request', {}).get('session', [])
#     user_id = event['userName']
#     logger.info(f"Trigger: {trigger}, UserId: {user_id}")
#     logger.info(f"Session: {json.dumps(session)}")

#     # PHASE 1: DefineAuthChallenge
#     if trigger == "DefineAuthChallenge_Authentication":
#         success = len(session) == 2 and all(ch.get("challengeResult") for ch in session)
#         event['response'] = {
#             'challengeName': 'CUSTOM_CHALLENGE',
#             'issueTokens': success,
#             'failAuthentication': False
#         }

#         logger.info(f"Success: {success}")

#         if success:
#             try:
#                 topic_arn = ssm.get_parameter(Name='/dalscooter/authentication_sns_topic_arn')['Parameter']['Value']
#                 sns.publish(
#                     TopicArn=topic_arn,
#                     Subject='Login Successful',
#                     Message=f"Hello {user_id}, your login was successful!"
#                 )
#             except Exception as e:
#                 logger.error("SNS publish failed", exc_info=True)

#         return event

#     # PHASE 2: CreateAuthChallenge
#     elif trigger == "CreateAuthChallenge_Authentication":
#         if len(session) == 0:
#             # First challenge — Q&A from DynamoDB
#             try:
#                 response = dynamodb.get_item(
#                     TableName=table_name,
#                     Key={'userId': {'S': str(user_id)}}
#                 )
#                 item = response.get('Item', {})
#                 question = item['securityQuestion']['S']
#                 answer = item['securityAnswer']['S']
#                 event['response'] = {
#                     'publicChallengeParameters': {'question': question},
#                     'privateChallengeParameters': {'answer': answer},
#                     'challengeMetadata': 'QNA_CHALLENGE'
#                 }
#             except Exception as e:
#                 logger.error("DynamoDB Q&A fetch failed", exc_info=True)
#                 raise e

#         elif len(session) == 1:
#             # Second challenge — Caesar cipher
#             plain = random.choice(["delta", "train", "mouse"])
#             shift = 3
#             cipher = ''.join([chr((ord(c) - 97 + shift) % 26 + 97) for c in plain])
#             event['response'] = {
#                 'publicChallengeParameters': {'cipherText': cipher},
#                 'privateChallengeParameters': {'answer': plain},
#                 'challengeMetadata': 'CIPHER_CHALLENGE'
#             }

#         return event

#     # PHASE 3: VerifyAuthChallengeResponse
#     elif trigger == "VerifyAuthChallengeResponse_Authentication":
#         expected = event['request']['privateChallengeParameters']['answer'].strip().lower()
#         user_response = event['request']['challengeAnswer'].strip().lower()
#         event['response'] = {'answerCorrect': expected == user_response}
#         return event

#     # Fallback
#     logger.warning("Unexpected triggerSource or flow.")
#     event['response'] = {
#         'issueTokens': False,
#         'failAuthentication': True
#     }
#     return event