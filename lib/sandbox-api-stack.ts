import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SandboxApiStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const apiGw = new apiGateway.RestApi(this, 'SandboxApi', {
            restApiName: 'Sanbox Api'
        })

        const helloWorldLambda = new NodejsFunction(this, 'helloWorldLambda', {
            entry: 'lambdas/hello-world.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_22_X,
            environment: {
                HELLO_WORLD: "The cat stalks the mouse"
            },
            memorySize: 128,
            timeout: cdk.Duration.seconds(5),
        });

        // Hello world lambda
        const helloWorldRoute = apiGw.root.addResource('hello');
        helloWorldRoute.addMethod('GET', new apiGateway.LambdaIntegration(helloWorldLambda));

    }
}
