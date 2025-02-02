import type { PlaySet, SubDeck } from '../types.ts';
import { Dequeue } from './dequeue.ts';

function createBlocksOf(blockSize: number, subDeck: SubDeck): string[][] {
  const blocks: string[][] = [];
  const unsorted: PlaySet[] = [];

  sortIntoBlocksOf(
    blockSize,
    blocks,
    unsorted,
    subDeck.creatures,
    subDeck.artifacts
  );
  sortIntoBlocksOf(
    blockSize,
    blocks,
    unsorted,
    subDeck.artifacts,
    subDeck.instants
  );
  sortIntoBlocksOf(
    blockSize,
    blocks,
    unsorted,
    subDeck.instants,
    subDeck.sorceries
  );
  sortIntoBlocksOf(
    blockSize,
    blocks,
    unsorted,
    subDeck.sorceries,
    subDeck.enchantments
  );
  sortIntoBlocksOf(
    blockSize,
    blocks,
    unsorted,
    subDeck.enchantments,
    subDeck.others
  );
  sortIntoBlocksOf(blockSize, blocks, unsorted, subDeck.others);

  while (subDeck.lands.hasElements()) {
    unsorted.push(subDeck.lands.removeFromBack()!);
  }
  sortRestIntoBlocksOf(blockSize, blocks, unsorted.reverse());

  return blocks;
}

function sortIntoBlocksOf(
  blockSize: number,
  blocks: string[][],
  unsorted: PlaySet[],
  currentQueue: Dequeue<PlaySet>,
  nextQueue?: Dequeue<PlaySet>
) {
  while (currentQueue.hasElements()) {
    let currentPlaySet: PlaySet = currentQueue.removeFromFront()!;

    if (currentPlaySet.amount === blockSize) {
      blocks.push(
        Array(currentPlaySet.amount).fill(currentPlaySet.metaData!.img_uri)
      );
    } else if (currentQueue.peekFront() || nextQueue?.peekFront()) {
      tryMergeWithItemFromThisOrNextQueue(
        blockSize,
        blocks,
        unsorted,
        currentPlaySet,
        currentQueue,
        nextQueue
      );
    } else {
      unsorted.push(currentPlaySet);
    }
  }
}

function tryMergeWithItemFromThisOrNextQueue(
  blockSize: number,
  blocks: string[][],
  unsorted: PlaySet[],
  currentPlaySet: PlaySet,
  currentQueue: Dequeue<PlaySet>,
  nextQueue?: Dequeue<PlaySet>
): void {
  const nextPlaySet: PlaySet | null = currentQueue.removeFirstThatMatches(
    (playSet) => hasAmountPredicate(playSet, blockSize - currentPlaySet.amount)
  );

  if (nextPlaySet) {
    blocks.push(
      Array(currentPlaySet.amount)
        .fill(currentPlaySet.metaData!.img_uri)
        .concat(Array(nextPlaySet.amount).fill(nextPlaySet.metaData!.img_uri))
    );
  } else {
    tryMergeWithMatchFromNextQueue(
      blockSize,
      blocks,
      unsorted,
      currentPlaySet,
      nextQueue
    );
  }
}

function tryMergeWithMatchFromNextQueue(
  blockSize: number,
  blocks: string[][],
  unsorted: PlaySet[],
  currentPlaySet: PlaySet,
  nextQueue?: Dequeue<PlaySet>
): void {
  const matchFromNextQueue: PlaySet | null | undefined =
    nextQueue?.removeFirstThatMatches((playSet) =>
      hasAmountPredicate(playSet, blockSize - currentPlaySet.amount)
    );

  if (matchFromNextQueue) {
    blocks.push(
      Array(currentPlaySet.amount)
        .fill(currentPlaySet.metaData!.img_uri)
        .concat(
          Array(matchFromNextQueue.amount).fill(
            matchFromNextQueue.metaData!.img_uri
          )
        )
    );
  } else {
    unsorted.push(currentPlaySet);
  }
}

function hasAmountPredicate(a: PlaySet, amount: number): boolean {
  return a.amount === amount;
}

function sortRestIntoBlocksOf(
  blockSize: number,
  blocks: string[][],
  restBlocks: PlaySet[]
) {
  let currentBlock: string[] = [];
  restBlocks
    .reverse()
    .map((playSet) => ({ playSet: playSet, amount: playSet.amount }))
    .forEach(({ playSet, amount }) => {
      while (amount > 0) {
        const countToAdd = Math.min(amount, blockSize - currentBlock.length);
        for (let i = 0; i < countToAdd; i++) {
          currentBlock.push(playSet.metaData!.img_uri);
        }
        amount -= countToAdd;

        if (currentBlock.length === blockSize) {
          blocks.push(currentBlock);
          currentBlock = [];
        }
      }
    });

  if (currentBlock.length > 0) {
    blocks.push(currentBlock);
  }
}

export { createBlocksOf };
