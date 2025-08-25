import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";

// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class SandboxApiStack extends cdk.Stack {
    // Declare lambda functions to be created here.
    public readonly helloWorldLambda: NodejsFunction;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const apiGw = new apiGateway.RestApi(this, 'SandboxApi', {
            restApiName: 'Sanbox Api'
        })

        // Create nodejsfunctions  to be assigned to the lambbdas here
        this.helloWorldLambda = new NodejsFunction(this, 'helloWorldLambda', {
            entry: 'lib/lambdas/hello-world.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_22_X,
            environment: {
                HELLO_WORLD: "The cat stalks the mouse"
            },
            memorySize: 128,
            timeout: cdk.Duration.seconds(5),
        });

        // create routes here and assign lambda functions to them.

        // Hello world lambda - route
        const helloWorldRoute = apiGw.root.addResource('hello');
        helloWorldRoute.addMethod('GET', new apiGateway.LambdaIntegration(helloWorldLambda));

    }
}
