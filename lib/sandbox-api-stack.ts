import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SandboxApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const helloWorldLambda = new NodejsFunction(this, 'helloWorldLambda',{

    });
    // example resource
    // const queue = new sqs.Queue(this, 'SandboxApiQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
