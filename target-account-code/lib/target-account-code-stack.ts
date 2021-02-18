import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';

export class TargetAccountCodeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const eventBusPolicy = new events.CfnEventBusPolicy(this,"test",{
      statementId: "MySid",
      action: "events:PutEvents",
      eventBusName: "default",
      principal: "*"
    });

    const consumerFn = new lambda.Function(this, "consumerLambda", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("lambda"),
      handler: "consumer.handler",
    });

    // This Rule will be applied to default EventBus and will send event to Lambda function
    const rule = new events.Rule(this, "Rule", {
      eventPattern: {
        source: ["sourceacount.api"]
      },
      targets: [new targets.LambdaFunction(consumerFn)],
    });
  }
}
