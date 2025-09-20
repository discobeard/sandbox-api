import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {GetCommand, PutCommand} from "@aws-sdk/lib-dynamodb";
import {RestaurantRatingDb} from "../types/restaurant-types";

const client = new DynamoDBClient({region: 'eu-west-1'})
const tableName = process.env.RESTARUANT_TABLE_NAME || ''

const getByPk = async (restaurantId: string) => {
    const command = new GetCommand({
        TableName: tableName,
        Key: {restaurantId: restaurantId}
    });
    try {
        const result = await client.send(command);
        return result.Item
    } catch (error) {
        console.log(`PK: ${restaurantId} not found in table ${tableName}`, {error});
        return {
            message: 'Error occured while retrieving data'
        }
    }

}

const putItem = async (restaurantData: RestaurantRatingDb) => {
    const command = new PutCommand({
        TableName: tableName,
        Item: restaurantData
    })
    try {
        await client.send(command);
        return {success: true}
    } catch (error) {
        console.log('An error occured while updating item data', {error})
        return {success: false}
    }
}

const updateItem = async (restaurantData: RestaurantRatingDb) => {
    console.log("RESTARUANT_UPDATE item data", restaurantData)
    // TODO: Need to add optimistic locking set up to this to ensure data isn't overridden.
    const command = new PutCommand({
        TableName: tableName,
        Item: restaurantData
    })
    try {
        await client.send(command);
        return {success: true}

    } catch (error) {
        console.log('An error occured while updating item data', {error})
        return {success: false}
    }
}


const DynamoDbUtils = {getByPk, putItem, updateItem};

export default DynamoDbUtils;