export class EvolutionItem {
  species: {
    name: string;
    url: string;
  };
  is_baby: boolean;
  evolves_to?: EvolutionItem[];
}
