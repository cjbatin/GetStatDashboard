#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { Tags } from '@aws-cdk/core'
import { GetStatDashboardStack } from '../lib/get_stat_dashboard-stack';

const regions = { IRELAND: 'eu-west-1'}
const env = { account: '076097644456', region: regions.IRELAND }
const app = new cdk.App();

const devStack = new GetStatDashboardStack(app, 'GetStatDevDashboardStack', { env: env })
const uatStack = new GetStatDashboardStack(app, 'GetStatUATDashboardStack', { env: env })
const prodStack = new GetStatDashboardStack(app, 'GetStatProdDashboardStack', { env: env })

const devTags = Tags.of(devStack)
devTags.add('environment', 'dev')

const uatTags = Tags.of(uatStack)
uatTags.add('environment', 'uat')

const prodTags = Tags.of(prodStack)
prodTags.add('environment', 'prod')