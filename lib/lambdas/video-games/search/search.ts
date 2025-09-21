import { APIGatewayProxyEvent } from 'aws-lambda';
import {
  buildJsonResponse,
  nullParameterResponse,
} from '../../../utils/response-utils';
import RawgService from '../../../services/rawg-service';

interface VideoGameSearchRequest {
  title: string;
}

export const handler = (event: APIGatewayProxyEvent) => {
  if (!event.body) {
    return nullParameterResponse('Request must include body');
  }
  const body = event.body;
  const { title } = body as unknown as VideoGameSearchRequest;

  const response = RawgService.videoGameSearch(title);

  console.log(response);

  // TODO: Add RAWG service that will handle api requests.
  return buildJsonResponse(response);
};
