# aws-update-instagram

An AWS Lambda function to update your Instagram icon

## Checklist

1. Instagram account
    - username + password
2. AWS account
    - sign in as an IAM user
    - must have access key ID and secret access key
    - configure AWS CLI
3. AWS Secrets Manager secret named `instagram/login`
    - type: Other
    - key: username, value: your Instagram username
    - key: password, value: your Instagram password
4. AWS Lambda function named `update-instagram`
    - set Timeout to 1 minute
    - must have IAM role assigned that includes:
      - `SecretsManagerReadWrite`
      - `CloudWatchLogsFullAccess`

## Installation

```sh
$ git clone https://github.com/mrtillman/aws-update-instagram.git
$ cd aws-update-instagram
$ npm install
```

## Usage

```sh
# zip code + dependencies
$ npm run zip

# deploy to AWS Lambda
$ npm run deploy
```

### EventBridge Rule

|Setting|Description|
|---|---|
|Event schedule | Cron expression: `0 10 * * ? *`|
|Target | Lambda function: `update-instagram`|

### SNS Topic

|Setting|Description|
|---|---|
|Endpoint|Your email address|
|Name| `instagram-updates`|
|Protocol|Email|
|Type| Standard|

### CloudWatch Alarm

|Setting|Description|
|---|---|
|FunctionName|update-instagram|
|Metric name|Errors|
|Notification Action|When in alarm, send message to topic "instagram-updates"|
|Statistic|Sum|
|Threshold|Errors >= 1 for 1 datapoints within 5 minutes|
|Type|Metric|

## Sources

[AWSJavaScriptSDK | Class: AWS.S3](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html)

[NodeJS Instagram private API client](https://github.com/dilame/instagram-private-api)
- [Class: AccountRepository](https://github.com/dilame/instagram-private-api/blob/master/docs/classes/_repositories_account_repository_.accountrepository.md#changeprofilepicture)
- [Class: PublishService](https://github.com/dilame/instagram-private-api/blob/master/docs/classes/_services_publish_service_.publishservice.md#photo)


## License

[MIT](https://github.com/mrtillman/aws-update-instagram/blob/main/LICENSE)