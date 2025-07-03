variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "github_token" {
  description = "GitHub Personal Access Token (used by Amplify)"
  type        = string
  sensitive   = true
}

# variable "gcp_credentials_file" {
#   description = "Path to GCP service account credentials JSON file"
#   type        = string
# }

# variable "gcp_project_id" {
#   description = "GCP project ID"
#   type        = string
# }

# variable "gcp_region" {
#   description = "GCP region for deployment"
#   type        = string
#   default     = "us-central1"
# }