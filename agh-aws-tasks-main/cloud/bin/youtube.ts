#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { YouTubeMainStack } from '../lib/youtube-stack';

const app = new cdk.App();
new YouTubeMainStack(app, 'YouTubeMainStackPM', {
  env: {
    region: "eu-west-1",
  },
});
