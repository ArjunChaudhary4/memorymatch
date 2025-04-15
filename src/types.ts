export interface Word {
  id: string;
  term: string;
  definition: string;
}

export interface Exercise {
  words: Word[];
  shuffledDefinitions: string[];
  userMatches: { [key: string]: string };
  completed: boolean;
}
