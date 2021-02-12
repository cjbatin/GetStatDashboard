import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as GetStatDashboard from '../lib/get_stat_dashboard-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
