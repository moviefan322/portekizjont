<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { verbs100, pronouns } from '@/data'
import { conjugate } from '@/utils/conjugate'

const currentVerb = ref<{ pr: string; en: string } | null>(null)
const currentPronoun = ref<string>('')
const userInput = ref<string>('')
const submitted = ref(false)

function getRandomVerb() {
  const index = Math.floor(Math.random() * verbs100.length)
  currentVerb.value = verbs100[index]
}

function getRandomPronoun() {
  const index = Math.floor(Math.random() * pronouns.length)
  currentPronoun.value = pronouns[index]
}

function next() {
  getRandomVerb()
  getRandomPronoun()
  userInput.value = ''
  submitted.value = false
}

function check() {
  submitted.value = true
}

const isCorrect = computed(() => {
  if (!currentVerb.value || !currentPronoun.value) return false

  const correct = conjugate(currentVerb.value.pr, currentPronoun.value, 'preterito_perfeito')
  console.log('Correct answer should be:', correct) // ✅ LOG HERE

  return userInput.value.trim().toLowerCase() === correct?.toLowerCase()
})


onMounted(() => {
  next()
})

console.log(conjugate(currentVerb.value?.pr || '', currentPronoun.value, 'preterito_perfeito'))
</script>

<template>
  <div class="container">
    <h1>Pretério Perfeito</h1>

    <div v-if="currentVerb">
      <h2>{{ currentVerb.pr }}</h2>
      <p>{{ currentVerb.en }}</p>
    </div>

    <div>
      <h3>{{ currentPronoun }}</h3>
    </div>

    <div>
      <input
        v-model="userInput"
        :class="{
          correct: submitted && isCorrect,
          incorrect: submitted && !isCorrect,
        }"
        placeholder="Enter conjugation"
      />
    </div>

    <div class="button-row">
      <button @click="check">Check Answer</button>
      <button @click="next">Next</button>
    </div>

    <div v-if="submitted">
      <p v-if="isCorrect" class="correct-msg">✅ Correct!</p>
      <p v-else class="incorrect-msg">❌ Nope — try again.</p>
    </div>

    <router-link to="/">← Back to Home</router-link>
  </div>
</template>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  font-family: sans-serif;
}

input {
  font-size: 1.2em;
  padding: 0.5em;
  width: 100%;
  margin: 1em 0;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.2s;
}

input.correct {
  border-color: green;
  background-color: #e5ffe5;
}

input.incorrect {
  border-color: red;
  background-color: #ffe5e5;
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
</style>
