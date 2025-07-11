output "auth_user_pool_id" {
  value = module.auth_module.user_pool_id
}

output "auth_user_pool_client_id" {
  value = module.auth_module.user_pool_client_id
}

output "auth_dynamodb_table_name" {
  value = module.auth_module.dynamodb_table_name
}

output "auth_api_gateway_endpoint" {
  value = module.auth_module.api_gateway_endpoint
}

output "amplify_app_id" {
  value = module.amplify_deploy.amplify_app_id
}

output "bike_crud_api_endpoint" {
  value = module.bike_module.bike_api_gateway_endpoint
}