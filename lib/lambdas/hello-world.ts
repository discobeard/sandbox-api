export const handler = async () => {
    const response: string = 'The quick brown fox jumps over the lazy dog';
    console.log('Hello cloud watch!')
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: `Hello world - ${response} ${process.env.MY_TEST_SECRET || ''}`,
        }),
    };
}