# import json
# import boto3
# import os
# import logging

# dynamodb = boto3.resource('dynamodb')
# sns = boto3.client('sns')
# table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])
# # sns_topic_arn = os.environ['SNS_TOPIC_ARN']
# ssm = boto3.client('ssm')

# logger = logging.getLogger()
# logger.setLevel(logging.INFO)

# def handler(event, context):
#     try:
#         logger.info("=== Event Triggered ===")
#         body = json.loads(event['body'])
#         user_id = body['userId']
#         question = body['question']
#         answer = body['answer']
#         email = body['email']

#         logger.info(f"Email in event: {email}")

#         table.put_item(Item={
#             'userId': user_id,
#             'securityQuestion': question,
#             'securityAnswer': answer
#         })

#         topic_arn = ssm.get_parameter(Name='/dalscooter/authentication_sns_topic_arn')['Parameter']['Value']

#         # Publish SNS notification
#         sns.publish(
#             TopicArn=topic_arn,
#             Subject='Registration Successful',
#             Message=f"Welcome {email}! Your registration is complete.",
#         )

#         return {
#             'statusCode': 200,
#             'body': json.dumps({'message': 'Q&A stored successfully'})
#         }
#     except Exception as e:
#         return {
#             'statusCode': 500,
#             'body': json.dumps({'error': str(e)})
#         }


import json
import boto3
import os

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['DYNAMODB_TABLE'])

def handler(event, context):
    try:
        body = json.loads(event['body'])
        user_id = body['userId']
        question = body['question']
        answer = body['answer']

        table.put_item(Item={
            'userId': user_id,
            'securityQuestion': question,
            'securityAnswer': answer
        })

        return {
            'statusCode': 200,
            'body': json.dumps({'message': 'Q&A stored successfully'})
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'error': str(e)})
        }