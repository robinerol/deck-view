<script setup lang="ts">
import { buildGradient, renderDeck } from '../utils/render';
import { type Deck } from '../types';
import { defineProps, onMounted, reactive, ref } from 'vue';
import DeckDetailsComponent from './DeckDetailsComponent.vue';
import { takeScreenshotAndDownload } from '../utils/screenshot.ts';

const deck = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();
const divider = ref<HTMLDivElement>();
const props = defineProps<{
  title: String;
  pilot: String;
  deck: Deck;
}>();
const screenshotStatus = reactive({ loading: false });

onMounted(() => {
  if (container.value && divider.value && deck.value) {
    container.value.style.background = buildGradient(
      props.deck.stats.color_identity,
      10
    );
    divider.value.style.background = buildGradient(
      props.deck.stats.color_identity,
      350
    );

    renderDeck(props.deck, deck.value, 4, 3);
  }
});

const exportView = async () => {
  if (container.value) {
    screenshotStatus.loading = true;
    await takeScreenshotAndDownload(
      container.value,
      `${props.pilot.replace(/ +/g, '-')}_${props.title.replace(/ +/g, '_')}.png`
    );
    screenshotStatus.loading = false;
  }
};

const restart = () => {
  window.location.href = '/deck-view';
};
</script>

<template>
  <div class="deck-container">
    <div class="actions">
      <button @click="restart">Restart</button>
      <button @click="exportView">Export</button>
    </div>
    <div v-if="screenshotStatus.loading" class="spinner-container">
      <div class="spinner"></div>
      <span>Generating...</span>
      <span>This may take a few seconds.</span>
    </div>
    <div ref="container" id="container">
      <div ref="deck" id="deck">
        <div id="sidebar">
          <DeckDetailsComponent
            :title="props.title"
            :pilot="props.pilot"
            :stats="props.deck.stats"
          ></DeckDetailsComponent>
        </div>
        <div ref="divider" id="divider"></div>
        <span id="disclaimer">
          Generated with MTG Deck View. MTG Deck Viewer is unofficial Fan
          Content permitted under the Fan Content Policy. Not approved/endorsed
          by Wizards. Portions of the materials used are property of Wizards of
          the Coast. ©Wizards of the Coast LLC.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.deck-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#container {
  position: relative;
  height: 1080px;
  width: 1080px;
  overflow: hidden;
  border-radius: 10px;
}

#deck {
  height: 1060px;
  width: 1060px;
  padding: 5px;
  border-radius: 10px;
  border: 5px solid rgba(0, 0, 0, 0.5);
}

#sidebar {
  position: absolute;
  top: 5px;
  right: 800px;
  bottom: 5px;
  left: 5px;
  background-color: rgba(0, 0, 0, 0.5);
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}

#divider {
  position: absolute;
  top: 750px;
  right: 80px;
  bottom: 320px;
  left: 370px;
  border-radius: 10px;
}

#disclaimer {
  position: absolute;
  bottom: 15px;
  left: 315px;
  right: 35px;
  font-size: 0.8rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.75);
}

.actions {
  display: flex;
  flex-direction: row;
  gap: 2rem;
}

button {
  border-radius: 5px;
  margin: 2rem 0 2rem 0;
  padding: 0.5rem;
  background-color: var(--primary);
  color: white;
  border: 2px solid var(--primary);
  cursor: pointer;
}

button:hover {
  border: 2px solid var(--accent);
}

.spinner-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.spinner {
  border: 4px solid var(--secondary);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin-7d6c7f68 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
