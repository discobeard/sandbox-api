import {APIGatewayProxyEvent, APIGatewayProxyResult} from "aws-lambda";
import {buildJsonResponse, nullParameterResponse} from "../../utils/response-utils";

interface AddRatingRequest {
    restaurantId: string;
    rating: number;
    restaurantName: string;
}

const tablename = process.env.RESTARUANT_TABLE_NAME || '';

export const handler = async (event: APIGatewayProxyEvent) => {
    if (!event.body){
        return nullParameterResponse();
    }
    const body = event.body() as AddRatingRequest;
    if (!body.restaurantId) {
        return nullParameterResponse('Restaurant ID is required');
    }

    if (!body.restaurantName) {
        return nullParameterResponse('Restaurant Name is required');
    }
    if(!body.restaurantName) {
        return nullParameterResponse('Rating is required');
    }

    return buildJsonResponse({ message: 'PENDING' })
};