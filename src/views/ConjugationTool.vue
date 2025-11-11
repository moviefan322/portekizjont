<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  verbs100,
  verbs200,
  verbs300,
  verbs400,
  verbs500,
  verbs600,
  verbs700,
  verbs800,
  verbs900,
  verbs1000,
  pronouns,
} from '@/data'
import { conjugate } from '@/utils/conjugate'

const verbSets = {
  'Top 100 Verbs': verbs100,
  'Verbs 101-200': verbs200,
  'Verbs 201-300': verbs300,
  'Verbs 301-400': verbs400,
  'Verbs 401-500': verbs500,
  'Verbs 501-600': verbs600,
  'Verbs 601-700': verbs700,
  'Verbs 701-800': verbs800,
  'Verbs 801-900': verbs900,
  'Verbs 901-1000': verbs1000,
}

const currentVerb = ref<{ pr: string; en: string } | null>(null)
const currentPronoun = ref<string>('')
const userInput = ref<string>('')
const submitted = ref(false)
const showFeedback = ref(false)
const isCorrect = ref(false)
const showSettings = ref(false)
const currentSetName = ref('Top 100 Verbs')
const currentSet = ref(verbs100)

function getRandomVerb() {
  const index = Math.floor(Math.random() * currentSet.value.length)
  currentVerb.value = currentSet.value[index]
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
  answerShown.value = false
}

function submit() {
  if (!currentVerb.value || !currentPronoun.value || !userInput.value.trim()) return

  submitted.value = true
  const correct = conjugate(currentVerb.value.pr, currentPronoun.value, 'preterito_perfeito')
  console.log('Correct answer:', correct)

  isCorrect.value = userInput.value.trim().toLowerCase() === correct?.toLowerCase()
  showFeedback.value = true
}

const answerShown = ref(false)

function showAnswer() {
  if (!currentVerb.value || !currentPronoun.value) return

  const correct = conjugate(currentVerb.value.pr, currentPronoun.value, 'preterito_perfeito')
  userInput.value = correct || ''
  submitted.value = true
  isCorrect.value = false
  answerShown.value = true
  showFeedback.value = true
}

function skip() {
  next()
}

function onInput() {
  if (submitted.value && showFeedback.value) {
    showFeedback.value = false
    submitted.value = false
    answerShown.value = false
  }
}

function changeVerbSet(setName: string) {
  currentSetName.value = setName
  currentSet.value = verbSets[setName as keyof typeof verbSets]
  showSettings.value = false
  next() // Get a new verb from the new set
}

function toggleSettings() {
  showSettings.value = !showSettings.value
}

onMounted(() => {
  next()
})
</script>

<template>
  <div class="container">
    <div class="header-with-settings">
      <button class="settings-btn" @click="toggleSettings">
        <FontAwesomeIcon :icon="['fas', 'gear']" />
      </button>
      <div class="header-text">
        <h1>Pretérito Perfeito</h1>
      </div>
    </div>

    <!-- Settings Panel -->
    <div v-if="showSettings" class="settings-panel">
      <h3>Choose Verb Set:</h3>
      <select
        v-model="currentSetName"
        @change="changeVerbSet(currentSetName)"
        class="verb-set-select"
      >
        <option v-for="(verbSet, setName) in verbSets" :key="setName" :value="setName">
          {{ setName }}
        </option>
      </select>
      <div class="button-container">
        <button class="okButton" @click="showSettings = false">Ok</button>
      </div>
    </div>

    <div v-if="currentVerb && !showSettings">
      <h2>{{ currentVerb.pr }} ({{ currentVerb.en }})</h2>
    </div>

    <div v-if="!showSettings">
      <div class="conjugation-input">
        <h2>{{ currentPronoun }}</h2>

        <template v-if="submitted && (isCorrect || answerShown) && showFeedback">
          <p :class="isCorrect ? 'correct-msg' : 'shown-answer-msg'">{{ userInput }}</p>
        </template>

        <template v-else>
          <input
            v-model="userInput"
            @input="onInput"
            :class="{
              correct: submitted && isCorrect && showFeedback,
              incorrect: submitted && !isCorrect && showFeedback,
            }"
            placeholder="Enter conjugation"
          />
        </template>
      </div>

      <div class="button-row">
        <button @click="submit" :disabled="!userInput.trim() || (submitted && showFeedback)">
          Submit
        </button>
        <button
          @click="showAnswer"
          :disabled="submitted && (isCorrect || answerShown) && showFeedback"
        >
          Show Answer
        </button>
        <button @click="skip">
          {{ submitted && showFeedback ? 'Next' : 'Skip' }}
        </button>
      </div>

      <div v-if="submitted && showFeedback">
        <p v-if="isCorrect" class="correct-msg">✅ Correct!</p>
        <p v-else-if="!answerShown" class="incorrect-msg">❌ Nope — try again.</p>
      </div>
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

.container h1,
h2 {
  text-align: center;
  color: white;
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

.shown-answer-msg {
  color: #ff8c00;
  font-weight: bold;
  font-size: 1.5em;
  margin: 0;
}

.header-with-settings {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.header-text {
  flex: 1;
  text-align: center;
}

.settings-btn {
  position: fixed;
  top: 0.2rem;
  right: 0.2rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: all 0.2s;
  color: white;
}

.settings-btn:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #bfff00;
}

.settings-panel {
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.settings-panel h3 {
  color: white;
  margin-bottom: 1rem;
}

.verb-set-select {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 2px solid #dee2e6;
  border-radius: 6px;
  background: white;
  color: #2c3e50;
  cursor: pointer;
  transition: border-color 0.2s;
}

.verb-set-select:focus {
  outline: none;
  border-color: #007bff;
}

.okButton {
  margin-top: 1rem;
  padding: 0.5em 1em;
  cursor: pointer;
  justify-self: flex-end;
}

.button-container {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
