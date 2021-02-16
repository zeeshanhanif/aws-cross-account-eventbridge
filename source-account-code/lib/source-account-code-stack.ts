import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as events from '@aws-cdk/aws-events';
import * as targets from '@aws-cdk/aws-events-targets';
import {EventBusTarget} from './event-target/event-bus'

export class SourceAccountCodeStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // lambda that will produce our custom event.
    const producerFn = new lambda.Function(this, "producerLambda", {
      code: lambda.Code.fromAsset("lambda"),
      handler: "producer.handler",
      runtime: lambda.Runtime.NODEJS_12_X,
    });

    // Grant the lambda permission to put custom events on eventbridge
    events.EventBus.grantPutEvents(producerFn);

    // Target EventBus Loading using ARN
    const targetEventBus = events.EventBus.fromEventBusArn(this,"TargetEventBus","arn:aws:events:us-west-2:{TARGET_ACCOUNT_ID}:event-bus/default");

    const ruleForExternalEventBus = new events.Rule(this, "ruleForExternalEventBus",{
      eventPattern: {
        source: ["sourceacount.api"]
      },
      targets: [new EventBusTarget({
        eventBus: targetEventBus,
      })]
    })

  }
}
