<script setup lang="ts">
import FormComponent from './components/FormComponent.vue';
import DeckComponent from './components/DeckComponent.vue';
import { ref } from 'vue';
import SpinnerComponent from './components/SpinnerComponent.vue';
import { Deck, PlaySet } from './types.ts';
import { useData } from './composables/useData.ts';
import FooterComponent from './components/FooterComponent.vue';

const titleRef = ref<String>();
const pilotRef = ref<String>();
const deckRef = ref<Deck>();
const { data, isLoading, error, fetchPlaySetData } = useData();

const renderDeck = async (
  title: String,
  pilot: String,
  playSets: PlaySet[]
) => {
  await fetchPlaySetData(playSets, 4, 3);

  titleRef.value = title;
  pilotRef.value = pilot;
  deckRef.value = data.value;
};
</script>

<template>
  <FormComponent
    v-if="!isLoading && !data"
    @submitted="renderDeck"
  ></FormComponent>
  <SpinnerComponent v-else-if="isLoading"></SpinnerComponent>
  <DeckComponent
    v-else-if="titleRef && pilotRef && deckRef"
    :title="titleRef"
    :pilot="pilotRef"
    :deck="deckRef"
  ></DeckComponent>

  <div v-if="error">{{ error }}</div>

  <FooterComponent></FooterComponent>
</template>

<style scoped>
FooterComponent {
  width: 100%;
}
</style>
