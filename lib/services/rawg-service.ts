import axios from 'axios';
import { RAWG_BASE_URL } from '../config/constants';
import { RawgSearchResult } from '../types/video-games';

const RAWG_API_KEY = process.env.RAWG_API_KEY;

const videoGameSearch = async (title: string) => {
  const { data } = await axios.get<RawgSearchResult>(
    `${RAWG_BASE_URL}/games?key=${RAWG_API_KEY}&search=${title}`
  );
  return data;
};

const RawgService = { videoGameSearch };

export default RawgService;
