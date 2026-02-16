<script setup lang="ts">
import FormComponent from './components/FormComponent.vue';
import DeckComponent from './components/DeckComponent.vue';
import { ref } from 'vue';
import SpinnerComponent from './components/SpinnerComponent.vue';
import { Deck, PlaySet } from './types.ts';
import { useData } from './composables/useData.ts';
import FooterComponent from './components/FooterComponent.vue';
import Privacy from './components/Privacy.vue';
import Contact from './components/Contact.vue';

const titleRef = ref<String>();
const pilotRef = ref<String>();
const deckRef = ref<Deck>();
const { data, isLoading, error, fetchPlaySetData } = useData();
const showPrivacy = ref(false);
const showContact = ref(false);

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

const togglePrivacy = () => {
  showPrivacy.value = !showPrivacy.value;
  if (showPrivacy.value && showContact.value) showContact.value = false;
};

const toggleContact = () => {
  showContact.value = !showContact.value;
  if (showContact.value && showPrivacy.value) showPrivacy.value = false;
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

  <div class="legal">
    <div class="dropdown-container">
      <button @click="togglePrivacy">Privacy Policy</button>
      <div v-if="showPrivacy" class="dropdown-content">
        <Privacy />
      </div>
    </div>

    <div class="dropdown-container">
      <button @click="toggleContact">Legal Notice / Contact</button>
      <div v-if="showContact" class="dropdown-content">
        <Contact />
      </div>
    </div>
  </div>

  <FooterComponent></FooterComponent>
</template>

<style scoped>
.legal {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.dropdown-container {
  margin: 1rem 0;
  width: 75%;
  max-width: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.dropdown-container button {
  width: 100%;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.dropdown-content {
  width: 100%;
  margin-top: 0.5rem;
  padding: 1rem;
  border-radius: 4px;
}

FooterComponent {
  width: 100%;
}
</style>
