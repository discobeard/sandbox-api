import * as cdk from 'aws-cdk-lib';
import { RemovalPolicy, Duration } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apiGateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import {
  NodejsFunction,
  NodejsFunctionProps,
} from 'aws-cdk-lib/aws-lambda-nodejs';
import { AttributeType, Billing, TableV2 } from 'aws-cdk-lib/aws-dynamodb';

// TODO: create lambdas that will retrieve and update the table with video game information

export class SandboxApiStack extends cdk.Stack {
  // Declare lambda functions to be created here.
  public readonly helloWorldLambda: NodejsFunction;
  public readonly videoGameSearchLambda: NodejsFunction;
  public readonly videoGameTable: TableV2;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const apiGw = new apiGateway.RestApi(this, 'SandboxApi', {
      restApiName: 'Sanbox Api',
    });

    const commonLambdaProps: NodejsFunctionProps = {
      runtime: lambda.Runtime.NODEJS_22_X,
      handler: 'handler',
    };

    // Create nodejsfunctions  to be assigned to the lambdas here
    this.helloWorldLambda = new NodejsFunction(this, 'helloWorldLambda', {
      ...commonLambdaProps,
      functionName: 'hello-world',
      entry: 'lib/lambdas/hello-world.ts',
      environment: {
        HELLO_WORLD: 'The cat stalks the mouse',
        MY_TEST_SECRET: process.env.MY_TEST_SECRET || '',
      },
      memorySize: 128,
      timeout: Duration.seconds(5),
    });

    this.videoGameSearchLambda = new NodejsFunction(
      this,
      'videoGameSearchLambda',
      {
        ...commonLambdaProps,
        functionName: 'video-game-search',
        entry: 'lib/lambdas/video-games/search/search.ts',
        environment: {
          RAWG_API_KEY: process.env.RAWG_API_KEY || '',
        },
        memorySize: 128,
        timeout: Duration.seconds(5),
      }
    );

    const videoGameTableName = 'video-game-table';

    this.videoGameTable = new TableV2(this, 'videoGameTable', {
      partitionKey: {
        name: 'gameId',
        type: AttributeType.STRING,
      },
      tableName: videoGameTableName,
      billing: Billing.onDemand(),
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // create routes here and assign lambda functions to them.

    // Hello world lambda - route
    const helloWorldRoute = apiGw.root.addResource('hello');
    helloWorldRoute.addMethod(
      'GET',
      new apiGateway.LambdaIntegration(this.helloWorldLambda)
    );

    // video game rotue
    const videoGameRoute = apiGw.root.addResource('video-games');
    const searchRoute = videoGameRoute.addResource('search');
    searchRoute.addMethod(
      'GET',
      new apiGateway.LambdaIntegration(this.videoGameSearchLambda)
    );
  }
}
