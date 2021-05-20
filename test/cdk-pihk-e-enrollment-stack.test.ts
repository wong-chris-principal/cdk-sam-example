import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as CdkPihkEEnrollmentStack from '../lib/cdk-pihk-e-enrollment-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new CdkPihkEEnrollmentStack.CdkPihkEEnrollmentStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
