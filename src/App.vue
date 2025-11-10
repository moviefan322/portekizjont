<template>
  <div class="app">
    <div class="content-matte">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
// root shell — you can add a navbar or layout wrapper later
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-image: url('@/assets/flag.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 3rem;
  width: 600px;
  margin: 0 auto;
}

.content-matte {
  min-height: 400px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 12px;
  padding: 2rem;
  width: 100%;
  backdrop-filter: blur(1.5px);
}
</style>

<style>
/* Global styles */
.container {
  max-width: 500px;
  margin: auto;
  font-family: sans-serif;
  border: 1px solid #ccc;
  padding: 2em;
}

.button-row {
  display: flex;
  gap: 1em;
  margin-bottom: 1em;
}

button {
  padding: 0.5em 1em;
  font-size: 1em;
  cursor: pointer;
}

.correct-msg {
  color: green;
  font-weight: bold;
}

.incorrect-msg {
  color: red;
  font-weight: bold;
}

.shown-answer-msg {
  color: #ff8c00;
  font-weight: bold;
}
</style>
