<script setup lang="ts"></script>

<template>
  <footer>
    <span>
      MTG Deck View is unofficial Fan Content permitted under the Fan Content
      Policy. Not approved/endorsed by Wizards. Portions of the materials used
      are property of Wizards of the Coast. ©Wizards of the Coast LLC.
    </span>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: var(--primary);
  color: white;
  position: fixed;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  box-shadow: 0 -1px 1px 1px var(--primary);
}

span {
  text-align: center;
  font-size: 0.75rem;
  padding: 0.25rem;
}
</style>
