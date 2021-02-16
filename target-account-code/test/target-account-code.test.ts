import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TargetAccountCode from '../lib/target-account-code-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TargetAccountCode.TargetAccountCodeStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
