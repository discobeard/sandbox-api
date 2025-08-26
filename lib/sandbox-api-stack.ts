import * as cdk from 'aws-cdk-lib';
import {RemovalPolicy} from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import {Construct} from 'constructs';
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {AttributeType, Billing, TableV2} from "aws-cdk-lib/aws-dynamodb";

// TODO: Create a dynamoDB table that will store restuarant IDs as the partition key, with the restaurant name and rating as additional details.

// TODO: create lambdas that will retrieve and update the table with restaurant information

export class SandboxApiStack extends cdk.Stack {
    // Declare lambda functions to be created here.
    public readonly helloWorldLambda: NodejsFunction;
    public readonly restaurantTable: TableV2;

    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // The code that defines your stack goes here
        const apiGw = new apiGateway.RestApi(this, 'SandboxApi', {
            restApiName: 'Sanbox Api'
        })

        // Create nodejsfunctions  to be assigned to the lambdas here
        this.helloWorldLambda = new NodejsFunction(this, 'helloWorldLambda', {
            functionName: 'hello-world',
            entry: 'lib/lambdas/hello-world.ts',
            handler: 'handler',
            runtime: lambda.Runtime.NODEJS_22_X,
            environment: {
                HELLO_WORLD: "The cat stalks the mouse",
                MY_TEST_SECRET: process.env.MY_TEST_SECRET || ''
            },
            memorySize: 128,
            timeout: cdk.Duration.seconds(5),
        });

        this.restaurantTable = new TableV2(this, 'RestaurantTable', {
            partitionKey: {
                name: 'restaurantId',
                type: AttributeType.STRING,
            },
            tableName: 'restaurants',
            billing: Billing.onDemand(),
            removalPolicy: RemovalPolicy.DESTROY,
        })

        // create routes here and assign lambda functions to them.

        // Hello world lambda - route
        const helloWorldRoute = apiGw.root.addResource('hello');
        helloWorldRoute.addMethod('GET', new apiGateway.LambdaIntegration(this.helloWorldLambda));

    }
}
