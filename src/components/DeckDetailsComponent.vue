<script setup lang="ts">
import { defineProps, onMounted, ref } from 'vue';
import type { Stats } from '../types.ts';
import { buildGradient } from '../utils/render.ts';

const header = ref<HTMLSpanElement>();
const stats = ref<HTMLDivElement>();
const title = ref<HTMLSpanElement>();
const pilot = ref<HTMLSpanElement>();
const props = defineProps<{
  title: String;
  pilot: String;
  stats: Stats;
}>();

onMounted(() => {
  if (header.value && stats.value && title.value && pilot.value) {
    const gradient = buildGradient(props.stats.color_identity, 45);

    header.value.style.background = gradient;
    stats.value.style.background = gradient;
    title.value.style.background = gradient;
    pilot.value.style.background = gradient;
  }
});
</script>

<template>
  <span ref="header" id="header">Deck Stats</span>
  <table ref="stats" id="stats">
    <tbody>
      <tr>
        <td>Creatures</td>
        <td>{{ props.stats.creatures }}</td>
      </tr>
      <tr>
        <td>Artifacts</td>
        <td>{{ props.stats.artifacts }}</td>
      </tr>
      <tr>
        <td>Instants</td>
        <td>{{ props.stats.instants }}</td>
      </tr>
      <tr>
        <td>Sorceries</td>
        <td>{{ props.stats.sorceries }}</td>
      </tr>
      <tr>
        <td>Enchantments</td>
        <td>{{ props.stats.enchantments }}</td>
      </tr>
      <tr>
        <td>Lands</td>
        <td>{{ props.stats.lands }}</td>
      </tr>
    </tbody>
  </table>
  <span ref="title" id="title">{{ props.title }}</span>
  <span ref="pilot" id="pilot">{{ props.pilot }}</span>
</template>

<style scoped>
#header {
  position: absolute;
  top: 25px;
  left: 25px;
  font-size: 3rem;
  color: transparent;
  background-clip: text !important;
}

#stats {
  position: absolute;
  top: 90px;
  left: 25px;
  width: 220px;
  height: 200px;
  font-size: 1.5rem;
  color: transparent;
  background-clip: text !important;
}

#title {
  position: absolute;
  top: 300px;
  right: 15px;
  bottom: 25px;
  left: 150px;
  color: transparent;
  writing-mode: vertical-lr;
  transform: scale(-1, -1);
  font-size: 4rem;
  font-weight: bold;
  background-clip: text !important;
}

#pilot {
  position: absolute;
  top: 300px;
  right: 195px;
  bottom: 25px;
  left: 25px;
  color: transparent;
  writing-mode: vertical-lr;
  transform: scale(-1, -1);
  font-size: 3rem;
  background-clip: text !important;
}
</style>
