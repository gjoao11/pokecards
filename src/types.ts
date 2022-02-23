export interface Card {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  evolvesTo: string[];
  rules: string[];
  ancientTrait: {
    name: string;
    text: string;
  };
  abilities: {
    name: string;
    text: string;
    type: string;
  }[];
  attacks: {
    cost: string[];
    name: string;
    text: string;
    damage: string;
    convertedEnergyCost: number;
  }[];
  weaknesses: {
    type: string;
    value: string;
  }[];
  resistances: {
    type: string;
    value: string;
  }[];
  retreatCost: string[];
  convertedRetreatCost: number;
  set: Set;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumbers: number[];
  legalities: {
    standard: string;
    expanded: string;
    unlimited: string;
  };
  regulationMark: string;
  images: {
    small: string;
    large: string;
  };
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: {
    standard: string;
    expanded: string;
    unlimited: string;
  };
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: {
    symbol: string;
    logo: string;
  };
}
