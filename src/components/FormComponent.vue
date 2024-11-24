<script setup lang="ts">
import { parseDeckList } from '../utils/form';
import { DeckType, type PlaySet } from '../types';
import { reactive } from 'vue';

const emit = defineEmits(['submitted']);
const formData = reactive({ title: '', pilot: '', main: '', side: '' });
const errorMessage = reactive({ message: '' });

const handleSubmit = () => {
  try {
    errorMessage.message = '';
    const mainBoard: PlaySet[] = parseDeckList(
      formData.main.toString().split('\n'),
      DeckType.MAIN
    );
    const sideBoard: PlaySet[] = parseDeckList(
      formData.side.toString().split('\n'),
      DeckType.SIDE
    );

    emit(
      'submitted',
      formData.title,
      formData.pilot,
      mainBoard.concat(sideBoard)
    );
  } catch (error) {
    errorMessage.message =
      error instanceof Error
        ? error.message
        : `Unknown error while validating input: ${String(error)}`;
  }
};
</script>

<template>
  <div class="form-container">
    <form @submit.prevent="handleSubmit">
      <div class="input-container">
        <label>Deck Name</label>
        <input
          type="text"
          v-model="formData.title"
          placeholder="i.e. Mono Red"
          required
        />
      </div>
      <div class="input-container">
        <label>Pilot Name</label>
        <input
          type="text"
          v-model="formData.pilot"
          placeholder="i.e. John Doe"
          required
        />
      </div>
      <div class="textarea-container">
        <div class="input-container">
          <label>Mainboard</label>
          <textarea
            rows="25"
            v-model="formData.main"
            placeholder="4 Plains&#10;4 Island&#10;4 Swamp&#10;4 Mountain&#10;4 Forest&#10;..."
            required
          ></textarea>
        </div>
        <div class="input-container">
          <label>Sideboard</label>
          <textarea
            rows="25"
            v-model="formData.side"
            placeholder="4 Plains&#10;4 Island&#10;..."
            required
          ></textarea>
        </div>
      </div>
      <span class="error-message">
        {{ errorMessage.message }}
      </span>
      <button>Generate</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  justify-content: space-around;
}

form {
  display: flex;
  flex-direction: column;
  padding: 2rem 0 2rem 0;
  width: 75%;
  max-width: 1080px;
}

.input-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 1.5rem;
}

.textarea-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.textarea-container > .input-container {
  width: 49%;
}

label {
  padding-bottom: 0.5rem;
}

input,
textarea {
  border-radius: 5px;
  border: 1px solid var(--primary);
  background-color: var(--background);
  color: var(--text);
  padding: 0.5rem;
}

input:focus,
textarea:focus {
  outline: 1px solid var(--accent);
}

::placeholder {
  color: var(--secondary);
}

textarea {
  resize: vertical;
}

button {
  border-radius: 5px;
  margin-top: 1rem;
  padding: 0.5rem;
  background-color: var(--primary);
  color: white;
  border: 2px solid var(--primary);
  cursor: pointer;
}

button:hover {
  border: 2px solid var(--accent);
}

.error-message {
  color: var(--accent);
}
</style>
