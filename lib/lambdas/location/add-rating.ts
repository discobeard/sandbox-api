import {APIGatewayProxyEvent} from "aws-lambda";
import {AddRatingRequest, RestaurantRatingDb} from "../../types/restaurant-types";
import {buildJsonResponse, invalidParameterResponse, nullParameterResponse} from "../../utils/response-utils";
import DynamoDbUtils from "../../utils/dynamodb-utils";

export const handler = async (event: APIGatewayProxyEvent) => {
    if (!event.body) {
        return nullParameterResponse();
    }
    const {restaurantId, rating, restaurantName, sellsChickenWings} = JSON.parse(event.body) as AddRatingRequest;
    if (!restaurantId) {
        return nullParameterResponse('Restaurant ID is required');
    }

    if (!restaurantName) {
        return nullParameterResponse('Restaurant Name is required');
    }
    if (!rating) {
        return nullParameterResponse('Rating is required');
    }

    if (rating < 0 || rating > 5) {
        return invalidParameterResponse("Rating must be between 0 and 5");
    }

    if (sellsChickenWings === undefined || sellsChickenWings === null) {
        return nullParameterResponse('sellsChickenWings is required');
    }

    // TODO: dynamodb utils - need to get the list for this restuarant and add the rating to the array.

    // TODO: Update this lambda to add the new rating onto a queue, create a new lambda to process that message
    const restaurant = await DynamoDbUtils.getByPk(restaurantId) as RestaurantRatingDb;
    if (!restaurant) {
        const newRestaurant: RestaurantRatingDb = {
            restaurantId: restaurantId,
            ratingSum: rating,
            numberOfRatings: 1,
            restaurantName: restaurantName,
            sellsChickenWings: sellsChickenWings,
            locked: false,
            lockNumber: 0
        }
        return buildJsonResponse(DynamoDbUtils.putItem(newRestaurant));
    }

    // Add updated object back to the table, override the original.
    const response = await DynamoDbUtils.putItem(restaurant);

    return buildJsonResponse({message: {}})
};