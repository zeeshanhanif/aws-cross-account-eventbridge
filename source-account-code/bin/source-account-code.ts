#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SourceAccountCodeStack } from '../lib/source-account-code-stack';

const app = new cdk.App();
new SourceAccountCodeStack(app, 'SourceAccountCodeStack');
