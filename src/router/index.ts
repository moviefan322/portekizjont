import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ConjugationTool from '../views/ConjugationTool.vue'
import PrepositionTool from '../views/PrepositionTool.vue'
import FlashcardTool from '../views/FlashcardTool.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/conjugate', name: 'ConjugationTool', component: ConjugationTool },
    { path: '/prepositions', name: 'PrepositionTool', component: PrepositionTool },
    { path: '/flashcards', name: 'FlashcardTool', component: FlashcardTool },
  ],
})

export default router
