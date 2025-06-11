<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { verbs100, pronouns } from '@/data'
import { conjugate } from '@/utils/conjugate'

const currentVerb = ref<{ pr: string; en: string } | null>(null)
const currentPronoun = ref<string>('')
const userInput = ref<string>('')
const submitted = ref(false)
const showFeedback = ref(false)
const isCorrect = ref(false)

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
  showFeedback.value = false
  isCorrect.value = false
}

function check() {
  if (!currentVerb.value || !currentPronoun.value) return

  submitted.value = true
  const correct = conjugate(currentVerb.value.pr, currentPronoun.value, 'preterito_perfeito')
  console.log('Correct answer:', correct)

  isCorrect.value = userInput.value.trim().toLowerCase() === correct?.toLowerCase()
  showFeedback.value = true
}

function onInput() {
  if (submitted.value && showFeedback.value && !isCorrect.value) {
    showFeedback.value = false
  }
}

onMounted(() => {
  next()
})

</script>


<template>
  <div class="container">
    <h1>Pretérito Perfeito</h1>

    <div v-if="currentVerb">
      <h2>{{ currentVerb.pr }} ({{ currentVerb.en }})</h2>
    </div>

    <div class="conjugation-input">
      <h2>{{ currentPronoun }}</h2>

      <template v-if="submitted && isCorrect && showFeedback">
        <p class="correct-msg">{{ userInput }}</p>
      </template>

      <template v-else>
        <input
          v-model="userInput"
          @input="onInput"
          :class="{
            correct: submitted && isCorrect && showFeedback,
            incorrect: submitted && !isCorrect && showFeedback
          }"
          placeholder="Enter conjugation"
        />
      </template>
    </div>

    <div class="button-row">
      <button v-if="!isCorrect" @click="check">Check Answer</button>
      <button @click="next">Next</button>
    </div>

    <div v-if="submitted && showFeedback">
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
  border: 1px solid #ccc;
  padding: 2em;
}

.conjugation-input {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5em;
  align-items: center;
  gap: 1em;
}

input {
  font-size: 1.2em;
  padding: 0.5em;
  width: 100%;
  margin: 1em 0;
  transition: border-color 0.2s;
  background-color: transparent;
  color: white;
}

input.correct {
  border-color: green;
  color: rgb(54, 227, 54);
}

input.incorrect {
  border-color: red;
  color: red;
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
  font-size: 1.5em;
  margin: 0;
}

.incorrect-msg {
  color: red;
  font-weight: bold;
}
</style>
