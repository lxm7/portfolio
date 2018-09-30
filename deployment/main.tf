# Input variables
variable "aws_region" {
  type    = "string"
  default = "us-west-2"
}

variable "pipeline_name" {
  type    = "string"
  default = "alexandermoreton"
}

variable "bucket_name" {
  type    = "string"
  default = "www.alexandermoreton.co.uk"
}

variable "github_username" {
  type    = "string"
  default = "lxm7"
}

variable "github_token" {
  type = "string"
}

variable "github_repo" {
  type = "string"
}

provider "aws" {
  region     = "${var.aws_region}"
}

# CodePipeline resources
resource "aws_s3_bucket" "my_s3_portfolio" {
  bucket = "${var.bucket_name}"
  acl    = "private"
}

# resource "aws_cloudfront_distribution" "web_distribution" {
#  origin {
#   domain_name = "alexandermoreton.co.uk.s3-website-us-west-2.amazonaws.com"
#   origin_id = "S3-Website-alexandermoreton.co.uk.s3-website-us-west-2.amazonaws.com"
#  }

#  enabled = true
#  is_ipv6_enabled = true

#  ordered_cache_behavior {
#   allowed_methods = ["GET", "HEAD"]
#   cached_methods = ["GET", "HEAD"]
#   target_origin_id = "alexandermoreton.co.uk"
#   path_pattern = "*.zip"

#   forwarded_values {
#    query_string = false

#    cookies {
#     forward = "none"
#    }
#   }

#   viewer_protocol_policy = "allow-all"
#   min_ttl = 0
#   max_ttl = 31536000
#   default_ttl = 86400
#  }

#  default_cache_behavior {
#   allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
#   cached_methods = ["GET", "HEAD"]
#   target_origin_id = "alexandermoreton.co.uk"
#   smooth_streaming = false

#   forwarded_values {
#    query_string = false

#    cookies {
#     forward = "whitelist"
#     whitelisted_names = ["session", "variables"]
#    }
#   }

#   viewer_protocol_policy = "allow-all"
#   min_ttl = 0
#   max_ttl = 31536000
#   default_ttl = 86400
#  }
   
#  restrictions {
#   geo_restriction {
#    restriction_type = "none"
#   }
#  }
  
#  viewer_certificate {
#   cloudfront_default_certificate = true
#  }
# }

# resource "aws_cloudfront_distribution" "www_distribution" {
#  origin {
#   domain_name = "www.alexandermoreton.co.uk.s3-website-us-west-2.amazonaws.com"
#   origin_id = "S3-Website-www.alexandermoreton.co.uk.s3-website-us-west-2.amazonaws.com"
#  }

#  enabled = true
#  is_ipv6_enabled = true

#  ordered_cache_behavior {
#   allowed_methods = ["GET", "HEAD"]
#   cached_methods = ["GET", "HEAD"]
#   target_origin_id = "www.alexandermoreton.co.uk"
#   path_pattern = "*.zip"

#   forwarded_values {
#    query_string = false

#    cookies {
#     forward = "none"
#    }
#   }

#   viewer_protocol_policy = "allow-all"
#   min_ttl = 0
#   max_ttl = 31536000
#   default_ttl = 86400
#  }

#  default_cache_behavior {
#   allowed_methods = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
#   cached_methods = ["GET", "HEAD"]
#   target_origin_id = "www.alexandermoreton.co.uk"
#   smooth_streaming = false

#   forwarded_values {
#    query_string = false

#    cookies {
#     forward = "whitelist"
#     whitelisted_names = ["session", "variables"]
#    }
#   }

#   viewer_protocol_policy = "allow-all"
#   min_ttl = 0
#   max_ttl = 31536000
#   default_ttl = 86400
#  }
   
#  restrictions {
#   geo_restriction {
#    restriction_type = "none"
#   }
#  }
  
#  viewer_certificate {
#   cloudfront_default_certificate = true
#  }
# }

data "aws_iam_policy_document" "codepipeline_assume_policy" {
  statement {
    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["codepipeline.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "codepipeline_role" {
  name               = "${var.pipeline_name}-codepipeline-role"
  assume_role_policy = "${data.aws_iam_policy_document.codepipeline_assume_policy.json}"
}

# CodePipeline policy needed to use CodeCommit and CodeBuild
resource "aws_iam_role_policy" "attach_codepipeline_policy" {
  name = "${var.pipeline_name}-codepipeline-policy"
  role = "${aws_iam_role.codepipeline_role.id}"

  policy = <<EOF
{
    "Statement": [
        {
            "Action": [
                "s3:GetObject",
                "s3:GetObjectVersion",
                "s3:GetBucketVersioning",
                "s3:PutObject"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "cloudwatch:*",
                "sns:*",
                "sqs:*",
                "iam:PassRole"
            ],
            "Resource": "*",
            "Effect": "Allow"
        },
        {
            "Action": [
                "codebuild:BatchGetBuilds",
                "codebuild:StartBuild"
            ],
            "Resource": "*",
            "Effect": "Allow"
        }
    ],
    "Version": "2012-10-17"
}
EOF
}

# CodeBuild IAM Permissions
resource "aws_iam_role" "codebuild_assume_role" {
  name = "${var.pipeline_name}-codebuild-role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Service": "codebuild.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy" "codebuild_policy" {
  name = "${var.pipeline_name}-codebuild-policy"
  role = "${aws_iam_role.codebuild_assume_role.id}"

  policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
       "s3:PutObject",
       "s3:GetObject",
       "s3:GetObjectVersion",
       "s3:GetBucketVersioning"
      ],
      "Resource": "*",
      "Effect": "Allow"
    },
    {
      "Effect": "Allow",
      "Resource": [
        "${aws_codebuild_project.build_project.id}"
      ],
      "Action": [
        "codebuild:*"
      ]
    },
    {
      "Effect": "Allow",
      "Resource": [
        "*"
      ],
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ]
    }
  ]
}
POLICY
}

# CodeBuild Section for the Package stage
resource "aws_codebuild_project" "build_project" {
  name          = "${var.pipeline_name}-build"
  description   = "The CodeBuild project for ${var.pipeline_name}"
  service_role  = "${aws_iam_role.codebuild_assume_role.arn}"
  build_timeout = "60"

  artifacts {
    type = "CODEPIPELINE"
  }

  environment {
    compute_type = "BUILD_GENERAL1_SMALL"
    image        = "aws/codebuild/nodejs:6.3.1"
    type         = "LINUX_CONTAINER"
  }

  source {
    type      = "CODEPIPELINE"
    buildspec = "buildspec.yml"
  }
}

# Full CodePipeline
resource "aws_codepipeline" "codepipeline" {
  name     = "${var.pipeline_name}-codepipeline"
  role_arn = "${aws_iam_role.codepipeline_role.arn}"

  artifact_store = {
    location = "${aws_s3_bucket.my_s3_portfolio.bucket}"
    type     = "S3"
  }

  stage {
    name = "Source"

    action {
      name             = "Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["code"]

      configuration {
        Owner                = "${var.github_username}"
        OAuthToken           = "${var.github_token}"
        Repo                 = "${var.github_repo}"
        Branch               = "master"
        PollForSourceChanges = "true"
      }
    }
  }

  stage {
    name = "DeployToS3"

    action {
      name             = "DeployToS3"
      category         = "Test"
      owner            = "AWS"
      provider         = "CodeBuild"
      input_artifacts  = ["code"]
      output_artifacts = ["deployed"]
      version          = "1"

      configuration {
        ProjectName = "${aws_codebuild_project.build_project.name}"
      }
    }
  }
}