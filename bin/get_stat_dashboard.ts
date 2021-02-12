#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { GetStatDashboardStack } from '../lib/get_stat_dashboard-stack';

const app = new cdk.App();
new GetStatDashboardStack(app, 'GetStatDashboardStack');
