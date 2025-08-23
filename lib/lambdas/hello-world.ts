import { APIGatewayProxyEvent } from 'aws-lambda';

const environmentVariable = process.env.HELLO_WORLD || '';

export const handler = async (event: APIGatewayProxyEvent) => {
        const response: string = 'The quick brown fox jumps over the lazy dog';
    return {
        statusCode: 200,
        body: {
            message: `Hello world - ${response} ${environmentVariable}`,
        }
    }
}