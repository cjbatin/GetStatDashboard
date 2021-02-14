import '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import * as GetStatDashboard from '../lib/get_stat_dashboard-stack';

const regions = { IRELAND: 'eu-west-1'}
const env = { account: '076097644456', region: regions.IRELAND }

describe('All Projects handler', () => {
    test('Lambda handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::Lambda::Function', {
            Handler: "allProjects.main",
            Runtime: "nodejs12.x"
        });
    });

    test('Log retention handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('Custom::LogRetention', {
            RetentionInDays: 14
        });
    });

    test('IAM Role', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::IAM::Role', {});
    });
})

describe('All Sites handler', () => {
    test('Lambda handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::Lambda::Function', {
            Handler: "allSites.main",
            Runtime: "nodejs12.x"
        });
    });

    test('Log retention handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('Custom::LogRetention', {
            RetentionInDays: 14
        });
    });

    test('IAM Role', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::IAM::Role', {});
    });
})

describe('Tags handler', () => {
    test('Lambda handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::Lambda::Function', {
            Handler: "tags.main",
            Runtime: "nodejs12.x"
        });
    });

    test('Log retention handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('Custom::LogRetention', {
            RetentionInDays: 14
        });
    });

    test('IAM Role', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::IAM::Role', {});
    });
})

describe('Main handler', () => {
    test('Lambda handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::Lambda::Function', {
            Handler: "index.main",
            Runtime: "nodejs12.x"
        });
    });

    test('Log retention handler', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('Custom::LogRetention', {
            RetentionInDays: 14
        });
    });

    test('IAM Role', () => {
        const app = new cdk.App();
        // WHEN
        const stack = new GetStatDashboard.GetStatDashboardStack(app, 'MyTestStack', { env: env });
        // THEN
        expect(stack).toHaveResource('AWS::IAM::Role', {});
    });
})