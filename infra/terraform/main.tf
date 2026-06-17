terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~> 3.6"
    }
  }
  backend "s3" {
    # Configure your S3 backend here
    # bucket = "seed-and-serve-terraform-state"
    # key    = "staging/terraform.tfstate"
    # region = "ap-south-1"
  }
}

provider "aws" {
  region = var.aws_region
  default_tags {
    tags = {
      Project     = "seed-and-serve"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# ── Variables ────────────────────────────────────────────────
variable "aws_region"   { default = "ap-south-1" }
variable "environment"  { default = "staging" }
variable "db_username"  { default = "seedserve" }
variable "db_name"      { default = "seedandserve" }
variable "app_name"     { default = "seed-and-serve" }

# ── Random suffix ────────────────────────────────────────────
resource "random_id" "suffix" {
  byte_length = 4
}

# ── S3 bucket for assets ─────────────────────────────────────
resource "aws_s3_bucket" "assets" {
  bucket = "${var.app_name}-assets-${random_id.suffix.hex}"
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_cors_configuration" "assets" {
  bucket = aws_s3_bucket.assets.id
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["PUT", "GET"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }
}

# ── RDS PostgreSQL ───────────────────────────────────────────
resource "random_password" "db" {
  length  = 24
  special = false
}

resource "aws_db_instance" "postgres" {
  identifier           = "${var.app_name}-db-${var.environment}"
  engine               = "postgres"
  engine_version       = "16"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  storage_type         = "gp3"
  storage_encrypted    = true
  db_name              = var.db_name
  username             = var.db_username
  password             = random_password.db.result
  publicly_accessible  = false
  skip_final_snapshot  = var.environment != "production"
  deletion_protection  = var.environment == "production"
  backup_retention_period = var.environment == "production" ? 7 : 1

  tags = { Name = "${var.app_name}-postgres" }
}

# ── SSM Parameters (secrets) ─────────────────────────────────
resource "aws_ssm_parameter" "db_url" {
  name  = "/${var.app_name}/${var.environment}/DATABASE_URL"
  type  = "SecureString"
  value = "postgresql://${var.db_username}:${random_password.db.result}@${aws_db_instance.postgres.endpoint}/${var.db_name}"
}

# ── Outputs ──────────────────────────────────────────────────
output "s3_bucket_name" { value = aws_s3_bucket.assets.id }
output "db_endpoint"    { value = aws_db_instance.postgres.endpoint; sensitive = true }
output "db_password"    { value = random_password.db.result;          sensitive = true }