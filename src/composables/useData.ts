import { ref } from 'vue';
import { cardApi } from '../services/cardApi.ts';
import { Card, Deck, PlaySet } from '../types.ts';
import { populateAndSort } from '../utils/data.ts';

function useData() {
  const data = ref<Deck>();
  const isLoading = ref<boolean>(false);
  const error = ref();

  const fetchPlaySetData = async (
    playSets: PlaySet[],
    mainBlockSize: number,
    sideBlockSize: number
  ) => {
    isLoading.value = true;

    try {
      const result = await cardApi.fetchPlaySetData(
        new Set(playSets.map((entry) => entry.name))
      );
      data.value = populateAndSort(
        result.data as Card[],
        playSets,
        mainBlockSize,
        sideBlockSize
      );
    } catch (err) {
      error.value = err;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, isLoading, error, fetchPlaySetData };
}

export { useData };
