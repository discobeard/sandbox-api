import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  buildJsonResponse,
  nullParameterResponse,
} from '../../../utils/response-utils';
import RawgService from '../../../services/rawg-service';

interface VideoGameSearchRequest {
  title: string;
}

export const handler = async (event: APIGatewayProxyEvent) => {
  if (!event.body) {
    return nullParameterResponse('Request must include body');
  }
  const body = event.body;
  console.log('Event', { event });
  const { title } = JSON.parse(body) as unknown as VideoGameSearchRequest;
  console.log(`Searching for video game: ${title}`);
  const response = await RawgService.videoGameSearch(title);

  return buildJsonResponse(response);
};
