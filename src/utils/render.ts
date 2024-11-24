import { Color, type Deck } from '../types.ts';
import { createBlocksOf } from './sort.ts';

function renderDeck(
  deck: Deck,
  container: HTMLElement,
  mainBlockSize: number,
  sideBlockSize: number
) {
  const main: string[][] = createBlocksOf(mainBlockSize, deck.main);
  const side: string[][] = createBlocksOf(sideBlockSize, deck.side);

  renderMainBoard(main, container);
  renderSideBoard(side, container);
}

function renderMainBoard(blocks: string[][] = [], container: HTMLElement) {
  blocks.forEach((images: string[], outerIndex: number) => {
    images.forEach((image, innerIndex) => {
      const img = document.createElement('img');
      img.src = image;
      img.style.maxWidth = '115px';
      img.style.borderRadius = '10px';
      img.style.position = 'absolute';
      img.style.top = `${35 + 17 * innerIndex + 230 * Math.floor(outerIndex / 5)}px`;
      img.style.left = `${325 + 8 * innerIndex + 145 * (outerIndex % 5)}px`;
      container.appendChild(img);
    });
  });
}

function renderSideBoard(blocks: string[][], container: HTMLElement) {
  blocks.forEach((images: string[], outerIndex: number) => {
    images.forEach((image, index) => {
      const img = document.createElement('img');
      img.src = image;
      img.style.maxWidth = '115px';
      img.style.borderRadius = '10px';
      img.style.position = 'absolute';
      img.style.top = `${805 + 17 * (index % 3)}px`;
      img.style.left = `${325 + 8 * (index % 3) + 147 * Math.floor(outerIndex % 5)}px`;
      container.appendChild(img);
    });
  });
}

function buildGradient(colors: Set<Color>, rotation: number): string {
  let gradient = `linear-gradient(${rotation}deg,`;
  if (colors.size > 1) {
    colors.forEach((color) => (gradient += color + ','));
  } else {
    const color = [...colors][0] ?? Color.DEFAULT;
    gradient += `${color},${findMatchingColor(color)}`;
  }
  return `${gradient.slice(0, -1)})`;
}

function findMatchingColor(color: Color): Color {
  switch (color) {
    case Color.WHITE:
      return Color.WHITE_ALT;
    case Color.BLUE:
      return Color.BLUE_ALT;
    case Color.BLACK:
      return Color.BLACK_ALT;
    case Color.RED:
      return Color.RED_ALT;
    case Color.GREEN:
      return Color.GREEN_ALT;
    default:
      return Color.DEFAULT;
  }
}

export { renderDeck, buildGradient };
