export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

export interface PokemonListItem {
  name: string;
  url: string;
}

export interface Generation {
  id: number;
  name: string;
  offset: number;
  limit: number;
}

export const GENERATIONS: Generation[] = [
  { id: 1, name: "Gen I", offset: 0, limit: 151 },
  { id: 2, name: "Gen II", offset: 151, limit: 100 },
  { id: 3, name: "Gen III", offset: 251, limit: 135 },
  { id: 4, name: "Gen IV", offset: 386, limit: 107 },
  { id: 5, name: "Gen V", offset: 493, limit: 156 },
  { id: 6, name: "Gen VI", offset: 649, limit: 72 },
  { id: 7, name: "Gen VII", offset: 721, limit: 88 },
  { id: 8, name: "Gen VIII", offset: 809, limit: 96 },
  { id: 9, name: "Gen IX", offset: 905, limit: 120 },
];
