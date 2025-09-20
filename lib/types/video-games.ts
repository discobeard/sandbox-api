export enum GamePlatform {
  SWITCH_2 = 'Switch 2',
  SWITCH = 'Switch',
  PLAYSTATION_5 = 'Playstation 5',
  PLAYSTATION_4 = 'Playstation 4',
  PLAYSTATION_3 = 'Playstation 3',
  PC = 'PC',
  MAC = 'Mac',
}

export enum GameStatus {
  CURRENTLY_PLAYING = 'Currently Playing',
  BACKLOG = 'Backlog',
  COMPLETED = 'Completed',
  ABANDONED = 'Abandoned',
  REPLAYING = 'Replaying',
}

export enum Rating {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}

export interface VideoGameTableBody {
  gameId: string;
  name: string;
  rating: Rating;
  positives: string;
  negatives: string;
  platform: GamePlatform;
  status: GameStatus;
}

interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

interface Genre {
  id: number;
  name: string;
  slug: string;
}

interface RawgTitleResult {
  slug: string;
  name: string;
  platforms: Platform[];
  releaseDate: string;
  background_image: string;
  metacritic: number;
  genres: Genre[];
}

export interface RawgSearchResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgTitleResult[];
}
