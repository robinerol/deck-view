import type { DeckType, PlaySet } from '../types.ts';

function parseDeckList(deckList: string[], deck: DeckType): PlaySet[] {
  return deckList.reduce((playSets, line) => {
    const trimmedLine: string = line.trim();
    if (!trimmedLine) {
      return playSets;
    }

    const matches: RegExpMatchArray = validateAndSplit(trimmedLine);
    const quantity = parseInt(matches[1], 10);
    const name = removeAccents(matches[2].trim());

    if (isNaN(quantity) || quantity <= 0) {
      throw new Error(
        `Invalid quantity for entry: "${line}". Quantity must be a positive integer.`
      );
    }

    playSets.push({
      name: name,
      amount:
        (playSets.find((set) => set.name === name)?.amount || 0) + quantity,
      deck: deck,
    } as PlaySet);

    return playSets;
  }, [] as PlaySet[]);
}

function validateAndSplit(input: string): RegExpMatchArray {
  const regex = /^(\d+)[xX]?\s+([^\n//]+)/;
  const match: RegExpMatchArray | null = input.match(regex);
  if (!match) {
    throw new Error(
      `Invalid entry format: "${input}". Expected format is "Quantity (xX) Card-Name e.g. 4 Forest, 5x Island, 3 X Plains, 4X Swamp".`
    );
  }
  return match;
}

function removeAccents(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export { parseDeckList, removeAccents };
