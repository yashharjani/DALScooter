import json
import os
import boto3
import logging

logger = logging.getLogger()
logger.setLevel(logging.INFO)

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.environ["DYNAMODB_TABLE_NAME"])

def lambda_handler(event, context):
    logger.info("Event: %s", json.dumps(event))

    try:
        claims = event["requestContext"]["authorizer"]["jwt"]["claims"]
        user_id = claims["sub"]
        groups = claims.get("cognito:groups", [])
        is_franchise = "BikeFranchise" in groups

        complaint_id = event["pathParameters"]["id"]

        # Fetch the complaint by ID
        response = table.get_item(Key={"messageId": complaint_id})
        item = response.get("Item")

        if not item:
            return {"statusCode": 404, "body": json.dumps({"error": "Complaint not found."})}

        # Access control
        if not (user_id == item["userId"] or user_id == item["assignedFranchiseId"]):
            return {"statusCode": 403, "body": json.dumps({"error": "Unauthorized to view this complaint."})}

        return {
            "statusCode": 200,
            "body": json.dumps(item)
        }

    except Exception as e:
        logger.error("Error retrieving complaint thread: %s", str(e), exc_info=True)
        return {"statusCode": 500, "body": json.dumps({"error": "Internal Server Error"})}