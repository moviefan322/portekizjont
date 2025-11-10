<script setup lang="ts">
// No logic needed for now
</script>

<template>
  <div class="home">
    <h1 class="title">Ferramentas de Estudo</h1>

    <div class="menu-buttons">
      <router-link to="/conjugate" class="menu-button">
        <h3>Conjugação de Verbos</h3>
      </router-link>

      <router-link to="/prepositions" class="menu-button">
        <h3>Prática de Preposições</h3>
      </router-link>

      <router-link to="/flashcards" class="menu-button">
        <h3>Cartões de Vocabulário</h3>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem 0;
}

.title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  padding-bottom: 2rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #ccc;
  margin-bottom: 3rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.menu-button {
  display: block;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.menu-button:hover {
  background: rgba(255, 255, 255, 1);
  border-color: #007bff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.menu-button h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin: 0 0 0.5rem 0;
}

.menu-button p {
  font-size: 1rem;
  color: #666;
  margin: 0;
}
</style>
