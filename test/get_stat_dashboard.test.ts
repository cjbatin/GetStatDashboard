import { SynthUtils } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as GetStatDashboard from '../lib/get_stat_dashboard-stack';

const regions = { IRELAND: 'eu-west-1'}
const env = { account: '07609764445', region: regions.IRELAND }

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
    // THEN
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
