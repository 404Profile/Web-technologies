<script setup>
import {ref} from "vue";

const isOpenPopUp = ref(false);

const openPopup = () => {
  isOpenPopUp.value = true;
}

const closePopup = () => {
  setTimeout(() => isOpenPopUp.value = false, 500);
}
</script>

<template>
  <div class="relative text-gray-700 flex items-center pl-3">
    <div @mouseenter="openPopup" @mouseleave="closePopup" class="hover:text-gray-900 hover:scale-105 cursor-help">
      <slot name="svg"/>
    </div>

    <Transition>
      <div v-if="isOpenPopUp" class="absolute sm:right-0 right-14 sm:left-14 w-48 shadow p-2 rounded-lg bg-white">
        <slot name="content" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>