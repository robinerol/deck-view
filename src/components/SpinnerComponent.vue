<script setup lang="ts"></script>

<template>
  <div class="spinner-container">
    <div class="spinner"></div>
    <span>Loading...</span>
  </div>
</template>

<style scoped>
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
}

.spinner {
  border: 4px solid var(--secondary);
  border-left-color: var(--primary);
  border-radius: 50%;
  width: 2vh;
  height: 2vh;
  animation: spin 1s linear infinite;
  margin-bottom: 2.5vh;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
