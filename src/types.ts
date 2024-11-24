import { Dequeue } from './utils/dequeue.ts';

enum Color {
  WHITE = 'rgba(248,231,185,1)',
  WHITE_ALT = 'rgba(249,250,244,.5)',
  BLUE = 'rgba(179,206,234,1)',
  BLUE_ALT = 'rgba(14,104,171,.5)',
  BLACK = 'rgba(166,159,157,1)',
  BLACK_ALT = 'rgba(21,11,0,.5)',
  RED = 'rgba(235,159,130,1)',
  RED_ALT = 'rgba(211,32,42,.5)',
  GREEN = 'rgba(196,211,202,1)',
  GREEN_ALT = 'rgba(0,115,62,.5)',
  DEFAULT = 'rgb(128,128,128)',
}

enum DeckType {
  MAIN = 'main',
  SIDE = 'side',
}

type MetaData = {
  img_uri: string;
  cmc: number;
  colors: string[];
  type_line: string;
};

type PlaySet = {
  name: string;
  metaData?: MetaData;
  amount: number;
  deck: DeckType;
};

type Card = {
  name: string;
  image_uris: {
    small: string;
  };
  card_faces?: [
    {
      image_uris: {
        small: string;
      };
      type_line: string;
    },
  ];
  cmc: number;
  colors: string[];
  type_line: string;
};

type Deck = {
  main: SubDeck;
  side: SubDeck;
  stats: Stats;
};

type SubDeck = {
  creatures: Dequeue<PlaySet>;
  lands: Dequeue<PlaySet>;
  artifacts: Dequeue<PlaySet>;
  sorceries: Dequeue<PlaySet>;
  instants: Dequeue<PlaySet>;
  enchantments: Dequeue<PlaySet>;
  others: Dequeue<PlaySet>;
};

type Stats = {
  color_identity: Set<Color>;
  creatures: number;
  lands: number;
  artifacts: number;
  sorceries: number;
  instants: number;
  enchantments: number;
  others: number;
};

export { Color, DeckType };
export type { MetaData, PlaySet, Card, Deck, SubDeck, Stats };
