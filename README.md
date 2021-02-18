# AWS Cross Account access with AWS EventBridge
This repo is for sample application to implement cross account communication on event bridge

To send event from one aws account to another we need to follow specific steps

There are two folders
1. source-account-code -- This contains cdk code that will be provisioned in account that will send event
2. target-account-code -- This contains cdk code that will be provisioned in account that will receive event

## Important to read
https://docs.aws.amazon.com/eventbridge/latest/userguide/eventbridge-cross-account-event-delivery.html

https://aws.amazon.com/blogs/compute/simplifying-cross-account-access-with-amazon-eventbridge-resource-policies/

## EventBus Target -- In Source Account Code
EventBus Target is still not part of AWS CDK so I have used from one of its pull request which will be part of AWS CDK in future, after that we will not require to use this code

https://github.com/aws/aws-cdk/pull/12926

## Resource Based Policy -- In Target Account
Need to added Resource Based Policy on Event bus of Target Account

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-events-eventbuspolicy.html

https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_identity-vs-resource.html
