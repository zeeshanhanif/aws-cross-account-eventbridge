#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TargetAccountCodeStack } from '../lib/target-account-code-stack';

const app = new cdk.App();
new TargetAccountCodeStack(app, 'TargetAccountCodeStack');
