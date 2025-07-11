provider "aws" {
  region = var.aws_region
}

# provider "google" {
#   credentials = file(var.gcp_credentials_file)
#   project     = var.gcp_project_id
#   region      = var.gcp_region
# }

# Auth Module
module "auth_module" {
  source     = "../auth-module/terraform"
  aws_region = var.aws_region
}

module "amplify_deploy" {
  source = "../amplify-deploy/terraform"

  aws_region                 = var.aws_region
  github_token              = var.github_token
  auth_api_gateway_endpoint = module.auth_module.api_gateway_endpoint
  auth_user_pool_id         = module.auth_module.user_pool_id
  auth_user_pool_client_id  = module.auth_module.user_pool_client_id
  bike_crud_api             = module.bike_module.bike_api_gateway_endpoint
}

# Bike Module (Admin & Guest CRUD access)
module "bike_module" {
  source                     = "../bike-module/terraform"
  aws_region                = var.aws_region
  cognito_user_pool_id      = module.auth_module.user_pool_id
  cognito_user_pool_client_id = module.auth_module.user_pool_client_id
}

# # Virtual Assistant Module (Placeholder for GCP Dialogflow)
# module "virtual_assistant" {
#   source            = "../backend/virtual-assistant/terraform"
#   gcp_project_id    = var.gcp_project_id
#   gcp_region        = var.gcp_region
#   gcp_credentials_file = var.gcp_credentials_file
# }

# # Notification Module (Placeholder for AWS SNS/SQS)
# module "notification" {
#   source     = "../backend/notification/terraform"
#   aws_region = var.aws_region
# }