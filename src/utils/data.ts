import { Dequeue } from './dequeue';
import {
  type Card,
  Color,
  type Deck,
  DeckType,
  type MetaData,
  type PlaySet,
  type Stats,
  type SubDeck,
} from '../types.ts';
import { removeAccents } from './form.ts';

function populateAndSort(
  cardData: Card[],
  playSets: PlaySet[],
  mainBlockSize: number,
  sideBlockSize: number
): Deck {
  const populatedDeck: Deck = initializeDeck();

  playSets.forEach((playSet: PlaySet) => {
    const card: Card | undefined = cardData.find((entry) =>
      removeAccents(entry.name).startsWith(playSet.name)
    );
    if (!card) {
      return;
    }

    playSet.metaData = {
      name: playSet.name,
      img_uri: card.card_faces
        ? card.card_faces[0].image_uris.small
        : card.image_uris.small,
      cmc: card.cmc,
      colors: card.colors ?? [],
      type_line: card.card_faces
        ? card.card_faces[0].type_line
        : card.type_line,
    } as MetaData;

    updateColorIdentity(populatedDeck.stats, playSet.metaData.colors);

    if (playSet.deck === DeckType.MAIN) {
      sortIntoDeck(
        playSet,
        populatedDeck.main,
        mainBlockSize,
        populatedDeck.stats
      );
    } else {
      sortIntoDeck(playSet, populatedDeck.side, sideBlockSize);
    }
  });

  return populatedDeck;
}

function initializeDeck(): Deck {
  return {
    main: {
      creatures: new Dequeue<PlaySet>(),
      lands: new Dequeue<PlaySet>(),
      artifacts: new Dequeue<PlaySet>(),
      sorceries: new Dequeue<PlaySet>(),
      instants: new Dequeue<PlaySet>(),
      enchantments: new Dequeue<PlaySet>(),
      others: new Dequeue<PlaySet>(),
    },
    side: {
      creatures: new Dequeue<PlaySet>(),
      lands: new Dequeue<PlaySet>(),
      artifacts: new Dequeue<PlaySet>(),
      sorceries: new Dequeue<PlaySet>(),
      instants: new Dequeue<PlaySet>(),
      enchantments: new Dequeue<PlaySet>(),
      others: new Dequeue<PlaySet>(),
    },
    stats: {
      color_identity: new Set<Color>(),
      creatures: 0,
      lands: 0,
      artifacts: 0,
      sorceries: 0,
      instants: 0,
      enchantments: 0,
      others: 0,
    },
  };
}

function sortIntoDeck(
  playSet: PlaySet,
  deck: SubDeck,
  blockSize: number,
  stats?: Stats
) {
  if (!playSet.metaData) {
    return;
  }

  const predicate = (a: PlaySet, b: PlaySet) =>
    blockSizeThenAscPredicate(a, b, blockSize);

  switch (true) {
    case /Creature/i.test(playSet.metaData.type_line):
      deck.creatures.addBefore(playSet, predicate);
      if (stats) stats.creatures += playSet.amount;
      break;
    case /Land/i.test(playSet.metaData.type_line):
      deck.lands.addBefore(playSet, predicate);
      if (stats) stats.lands += playSet.amount;
      break;
    case /Artifact/i.test(playSet.metaData.type_line):
      deck.artifacts.addBefore(playSet, predicate);
      if (stats) stats.artifacts += playSet.amount;
      break;
    case /Sorcery/i.test(playSet.metaData.type_line):
      deck.sorceries.addBefore(playSet, predicate);
      if (stats) stats.sorceries += playSet.amount;
      break;
    case /Instant/i.test(playSet.metaData.type_line):
      deck.instants.addBefore(playSet, predicate);
      if (stats) stats.instants += playSet.amount;
      break;
    case /Enchantment/i.test(playSet.metaData.type_line):
      deck.enchantments.addBefore(playSet, predicate);
      if (stats) stats.enchantments += playSet.amount;
      break;
    default:
      deck.others.addBefore(playSet, predicate);
      if (stats?.others) stats.others += playSet.amount;
  }
}

function blockSizeThenAscPredicate(
  newSet: PlaySet,
  existingSet: PlaySet,
  blockSize: number
): boolean {
  return (
    newSet.amount === blockSize ||
    newIsSmallerAndExistingNotEqualToBlockSize(
      newSet.amount,
      existingSet.amount,
      blockSize
    )
  );
}

function newIsSmallerAndExistingNotEqualToBlockSize(
  a: number,
  b: number,
  blockSize: number
) {
  return b !== blockSize && a < b;
}

function updateColorIdentity(stats: Stats, colors: string[]) {
  colors.forEach((color) => {
    switch (color) {
      case 'W':
        stats.color_identity.add(Color.WHITE);
        break;
      case 'U':
        stats.color_identity.add(Color.BLUE);
        break;
      case 'B':
        stats.color_identity.add(Color.BLACK);
        break;
      case 'R':
        stats.color_identity.add(Color.RED);
        break;
      case 'G':
        stats.color_identity.add(Color.GREEN);
        break;
    }
  });
}

export { populateAndSort };
