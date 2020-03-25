#!/bin/bash -eu
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)"  # Figure out where the script is running
. "$SCRIPT_DIR"/lib-robust-bash.sh # load the robust bash library
PROJECT_ROOT="$SCRIPT_DIR"/.. # Figure out where the project directory is

# Ensure dependencies are present

require_binary aws
require_binary sam

# Ensure configuration is present

if [ ! -f "$PROJECT_ROOT/config.sh" ]; then
  echo "ERROR: config.sh is missing. Copy example-config.sh and modify as appropriate."
  echo "   cp example-config.sh config.sh"
  exit 1
fi
source ./config.sh

OUTPUT_TEMPLATE_FILE="$PROJECT_ROOT/serverless-output.yml"
aws s3 mb "s3://$BUCKET_NAME" --region "$REGION" || true
echo "packaged successfully!"
sam package --template-file template.yml --output-template-file "$OUTPUT_TEMPLATE_FILE"  --s3-bucket "$BUCKET_NAME"
sam deploy \
  --capabilities CAPABILITY_IAM \
  --debug TRUE \
  --parameter-overrides CognitoRedirectUriParameter="$COGNITO_REDIRECT_URI" GitHubClientIdParameter="$GITHUB_CLIENT_ID" GitHubClientSecretParameter="$GITHUB_CLIENT_SECRET" LambdaProvisionedConcurrentExecutions=$LAMBDA_PROVISIONED_CONCURRENT_EXECUTIONS StageNameParameter="$STAGE_NAME" \
  --region "$REGION" \
  --stack-name "$STACK_NAME" \
  --template-file "$OUTPUT_TEMPLATE_FILE"
# --role-arn => optional role arn for the cloudformation stack to assume"
