<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  verbs100,
  verbsNoNa,
  verbs200,
  verbs300,
  verbs400,
  verbs500,
  verbs600,
  verbs700,
  verbs800,
  verbs900,
  verbs1000,
} from '@/data'

const verbSets = {
  'Top 100 Verbs': verbs100,
  'Preposition Verbs (25)': verbsNoNa,
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

const currentVerbIndex = ref(0)
const isFlipped = ref(false)
const showSettings = ref(false)
const currentSetName = ref('Top 100 Verbs')
const currentSet = ref(verbs100)
const currentVerb = ref(verbs100[0])
const correctCount = ref(0)
const totalCount = ref(0)
const flashColor = ref('')
const didntKnowCards = ref<Array<{ pr: string; en: string; pos: string }>>([])
const isReviewMode = ref(false)

function markCorrect() {
  correctCount.value++
  totalCount.value++
  flashBackground('green')
  setTimeout(() => {
    nextCard()
  }, 300)
}

function markIncorrect() {
  totalCount.value++
  // Add current card to didn't know pile
  didntKnowCards.value.push(currentVerb.value)
  flashBackground('red')
  setTimeout(() => {
    nextCard()
  }, 300)
}

function flashBackground(color: string) {
  flashColor.value = color
  setTimeout(() => {
    flashColor.value = ''
  }, 300)
}

function nextCard() {
  currentVerbIndex.value = (currentVerbIndex.value + 1) % currentSet.value.length

  // Check if we've reached the end of the current set
  if (currentVerbIndex.value === 0 && !isReviewMode.value && didntKnowCards.value.length > 0) {
    // Start review mode with the cards we didn't know
    startReviewMode()
    return
  }

  currentVerb.value = currentSet.value[currentVerbIndex.value]
  isFlipped.value = false
}

function startReviewMode() {
  isReviewMode.value = true
  currentSet.value = [...didntKnowCards.value]
  didntKnowCards.value = []
  shuffle()
}

function flipCard() {
  isFlipped.value = !isFlipped.value
}

function shuffle() {
  // Fisher-Yates shuffle algorithm
  const shuffled = [...currentSet.value]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  currentSet.value = shuffled
  currentVerbIndex.value = 0
  currentVerb.value = shuffled[0]
  isFlipped.value = false
  // Reset score and review mode when shuffling
  correctCount.value = 0
  totalCount.value = 0
  if (!isReviewMode.value) {
    didntKnowCards.value = []
  }
}

function changeVerbSet(setName: string) {
  currentSetName.value = setName
  currentSet.value = verbSets[setName as keyof typeof verbSets]
  isReviewMode.value = false
  didntKnowCards.value = []
  shuffle() // Shuffle the new set
  showSettings.value = false
}

function toggleSettings() {
  showSettings.value = !showSettings.value
}

// Auto-shuffle on component mount
onMounted(() => {
  shuffle()
})
</script>

<template>
  <div
    class="container"
    :class="{ 'flash-green': flashColor === 'green', 'flash-red': flashColor === 'red' }"
  >
    <div class="header-with-settings">
      <button class="settings-btn" @click="toggleSettings">
        <FontAwesomeIcon :icon="['fas', 'gear']" />
      </button>
      <div class="header-text">
        <h1>Cartões de Vocabulário</h1>
        <p class="subtitle">Vocabulary Flashcards</p>
      </div>
    </div>

    <!-- Settings Panel -->
    <div v-if="showSettings" class="settings-panel">
      <h3>Choose Flashcard Set:</h3>
      <select
        v-model="currentSetName"
        @change="changeVerbSet(currentSetName)"
        class="verb-set-select"
      >
        <option v-for="(verbSet, setName) in verbSets" :key="setName" :value="setName">
          {{ setName }}
        </option>
      </select>
    </div>
    <div v-else>
      <div class="card-counter">{{ currentVerbIndex + 1 }} / {{ currentSet.length }}</div>
      <div class="score-counter">Score: {{ correctCount }} / {{ totalCount }}</div>

      <div class="flashcard" @click="flipCard">
        <div class="card-content">
          <template v-if="!isFlipped">
            <div class="card-front">
              <h2>{{ currentVerb.pr }}</h2>
              <p class="hint">Click to reveal translation</p>
            </div>
          </template>

          <template v-else>
            <div class="card-back">
              <h2>{{ currentVerb.en }}</h2>
              <p class="portuguese">{{ currentVerb.pr }}</p>
            </div>
          </template>
        </div>
      </div>

      <div class="button-row flashcard-buttons">
        <button @click="markIncorrect" class="incorrect-btn">
          <FontAwesomeIcon :icon="['fas', 'times']" />
        </button>
        <button @click="markCorrect" class="correct-btn">
          <FontAwesomeIcon :icon="['fas', 'check']" />
        </button>
      </div>
    </div>

    <router-link to="/">← Back to Home</router-link>
  </div>
</template>

<style scoped>
.subtitle {
  text-align: center;
  color: #ccc;
  margin-bottom: 2rem;
}

.card-counter {
  text-align: center;
  color: white;
  margin-bottom: 0.5rem;
  font-size: 1.2rem;
}

.score-counter {
  text-align: center;
  color: #bfff00;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  font-weight: bold;
}

.review-mode-indicator {
  text-align: center;
  color: #ff6b6b;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: bold;
  background: rgba(255, 107, 107, 0.2);
  padding: 0.5rem;
  border-radius: 6px;
}

.flashcard {
  background: white;
  border-radius: 12px;
  min-height: 200px;
  margin-bottom: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.card-content {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 2rem;
  text-align: center;
}

.card-front h2 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.card-back h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.hint {
  color: #666;
  font-style: italic;
}

.portuguese {
  color: #666;
  font-size: 1.2rem;
}

.header-with-settings {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.correct-btn {
  background: #28a745;
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.2s;
  margin-left: 1rem;
}

.correct-btn:hover {
  background: #218838;
}

.incorrect-btn {
  background: #dc3545;
  border: none;
  color: white;
  padding: 1rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.2s;
}

.incorrect-btn:hover {
  background: #c82333;
}

.flashcard-buttons {
  justify-content: center;
  gap: 2rem;
}

.flash-green {
  background-color: rgba(40, 167, 69, 0.3) !important;
  transition: background-color 0.2s ease;
}

.flash-red {
  background-color: rgba(220, 53, 69, 0.3) !important;
  transition: background-color 0.2s ease;
}
</style>
