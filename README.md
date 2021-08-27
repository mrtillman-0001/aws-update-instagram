# aws-update-instagram

An AWS Lambda function to update your Instagram icon

## Checklist

1. Instagram account
    - username + password
    - use [demo.env](https://github.com/mrtillman-0001/aws-update-instagram/blob/main/demo.env) to create `.env` in project root
2. AWS account
    - sign in as an IAM user
    - must have access key ID and secret access key
    - [configure AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
3. AWS Lambda function named `update-instagram`
    - set Timeout to 1 minute
    - must have IAM role assigned that includes:
      - `AmazonS3FullAccess`
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

## License

[MIT](https://github.com/mrtillman/aws-update-instagram/blob/main/LICENSE)