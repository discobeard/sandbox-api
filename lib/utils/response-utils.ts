
export const nullParameterResponse = (message?: string) => {
    return {
        statusCode: 401,
        body: JSON.stringify({
            message: message || 'Expected parameters were not supplied.'
        }),
    };
}

export const buildJsonResponse = (response: unknown) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response),
    }
}