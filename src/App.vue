<script setup>
import { RouterView } from 'vue-router'
import Navigation from "@/components/Navigation.vue";
</script>

<template>
  <header>
    <Navigation />
  </header>

  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <Component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
