<script setup>
import {ref} from "vue";
import {RouterLink} from "vue-router";

const isOpenMobileNavigation = ref(false);

const closeNavigation = () => {
  isOpenMobileNavigation.value = false;
}
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-end lg:justify-center p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:hidden">
        <button @click="isOpenMobileNavigation = true" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900">
          Главная
        </RouterLink>
        <RouterLink to="/about" class="text-sm font-semibold leading-6 text-gray-900">
          Обо мне
        </RouterLink>
        <RouterLink to="/interests" class="text-sm font-semibold leading-6 text-gray-900">
          Мои интересы
        </RouterLink>
        <RouterLink to="/study" class="text-sm font-semibold leading-6 text-gray-900">
          Учеба
        </RouterLink>
        <RouterLink to="/photo" class="text-sm font-semibold leading-6 text-gray-900">
          Фотоальбом
        </RouterLink>
        <RouterLink to="/contacts" class="text-sm font-semibold leading-6 text-gray-900">
          Контакты
        </RouterLink>
        <RouterLink to="/test" class="text-sm font-semibold leading-6 text-gray-900">
          Тест
        </RouterLink>
      </div>
    </nav>
  </header>
    
  <div v-if="isOpenMobileNavigation">
		<div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"></div>
		<div class="fixed z-50 inset-0 lg:hidden">
			<div class="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900">
				<button @click="closeNavigation" type="button" class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600">
					<svg viewBox="0 0 10 10" class="w-2.5 h-2.5 overflow-visible" aria-hidden="true">
						<path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
					</svg>
				</button>
				<ul class="space-y-6">
					<li>
						<RouterLink to="/" @click="closeNavigation" class="hover:text-sky-500">
							Главная
						</RouterLink>
					</li>
					<li>
            <RouterLink to="/about" @click="closeNavigation" class="hover:text-sky-500">
							Обо мне
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/interests" @click="closeNavigation" class="hover:text-sky-500">
							Мои интересы
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/study" @click="closeNavigation" class="hover:text-sky-500">
							Учеба
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/photo" @click="closeNavigation" class="hover:text-sky-500">
							Фотоальбом
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/contacts" @click="closeNavigation" class="hover:text-sky-500">
							Контакт
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/test" @click="closeNavigation" class="hover:text-sky-500">
							Тест
            </RouterLink>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>