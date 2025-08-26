import {APIGatewayProxyEvent} from "aws-lambda";
import {buildJsonResponse, invalidParameterResponse, nullParameterResponse} from "../../utils/response-utils";

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
    const { restaurantId, rating, restaurantName } = JSON.parse(event.body) as AddRatingRequest;
    if (!restaurantId) {
        return nullParameterResponse('Restaurant ID is required');
    }

    if (!restaurantName) {
        return nullParameterResponse('Restaurant Name is required');
    }
    if(!rating) {
        return nullParameterResponse('Rating is required');
    }

    if(rating < 0 || rating > 5) {
        return invalidParameterResponse("Rating must be between 0 and 5");
    }

    // TODO: dynamodb utils to

    return buildJsonResponse({ message: 'PENDING' })
};