import {PokelistItem} from './pokelist-item';

export class PokelistResponse {
  count: number;
  next: string;
  previous: string;
  results: PokelistItem[];
}
