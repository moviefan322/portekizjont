<script setup lang="ts">
import { ref } from 'vue'
import { locations, randomPronoun, verbsNoNa } from '@/data'
import { pluralizeNoun } from '@/utils/pluralNoun'
import { conjugate } from '@/utils/conjugate'

// Define your interfaces here
// interface Location {
//   pr: strings
//   en: string
//   pos: string
//   gender: string
// }

// State variables - add your reactive data here
// const currentItem = ref<any>(null)
// const userAnswer = ref('')
// const score = ref(0)
// const attempts = ref(0)
// const showResult = ref(false)
const userInput = ref('')
const sentence = ref(generateSentence())
const submitted = ref(false)
const showFeedback = ref(false)
const isCorrect = ref(false)
const answerShown = ref(false)

function submit() {
  if (!userInput.value.trim()) return

  submitted.value = true
  isCorrect.value =
    userInput.value.trim().toLowerCase() === sentence.value.preposition.toLowerCase()
  showFeedback.value = true
}

function showAnswer() {
  userInput.value = sentence.value.preposition
  submitted.value = true
  isCorrect.value = false
  answerShown.value = true
  showFeedback.value = true
}

function skip() {
  next()
}

function next() {
  sentence.value = generateSentence()
  userInput.value = ''
  submitted.value = false
  showFeedback.value = false
  isCorrect.value = false
  answerShown.value = false
}

function onInput() {
  if (submitted.value && showFeedback.value) {
    showFeedback.value = false
    submitted.value = false
    answerShown.value = false
  }
}

function generateSentence() {
  const randomLocation = locations[Math.floor(Math.random() * locations.length)]
  const randomNoNaVerb = verbsNoNa[Math.floor(Math.random() * verbsNoNa.length)]
  const isPlural = Math.random() < 0.3
  const pronoun = randomPronoun()
  const conjugatedVerb = conjugate(randomNoNaVerb.pr, pronoun, 'presente_indicativo')

  return {
    beginning: `${pronoun} ${conjugatedVerb}`,
    preposition: returnPreposition(randomLocation.gender, isPlural),
    location: isPlural ? pluralizeNoun(randomLocation.pr) : randomLocation.pr,
  }
}

function returnPreposition(gender: string, isPlural: boolean) {
  if (isPlural) {
    return gender === 'f' ? 'numas' : 'nuns'
  } else {
    return gender === 'f' ? 'numa' : 'num'
  }
}

// Event handlers - add your event handling functions here
// function handleKeypress(event: KeyboardEvent) {
//   // Your logic here
// }

// Lifecycle hooks - add your lifecycle methods here
// onMounted(() => {
//   // Your initialization logic here
// })
</script>

<template>
  <div class="container">
    <h1>num/numa/nuns/numas</h1>

    <div class="sentence-input">
      <span>{{ sentence.beginning }}</span>

      <template v-if="submitted && (isCorrect || answerShown) && showFeedback">
        <span :class="isCorrect ? 'correct-msg' : 'shown-answer-msg'">{{ userInput }}</span>
      </template>

      <template v-else>
        <input
          v-model="userInput"
          @input="onInput"
          :class="{
            correct: submitted && isCorrect && showFeedback,
            incorrect: submitted && !isCorrect && showFeedback,
          }"
          placeholder="___"
        />
      </template>

      <span>{{ sentence.location }}</span>
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

.sentence-input {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5em;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5em;
}

input {
  font-size: 1em;
  width: 80px;
  transition: border-color 0.2s;
  background-color: transparent;
  color: white;
  text-align: center;
  border-bottom: 1px solid white;
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
  margin: 0;
}

.incorrect-msg {
  color: red;
  font-weight: bold;
}

.shown-answer-msg {
  color: #ff8c00;
  font-weight: bold;
  margin: 0;
}
</style>
