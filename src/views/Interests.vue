<script setup>
import {onMounted} from "vue";

const music = [
    'Tell Me - Hugeloud', 'Who We Are - Imagine Dragons', 'Starlight - ONEIL, KANVISE, SMOLA', 'Smithereens - Twenty One Pilots', 'Dream - QUATTROTEQUE, Mad Plazou, TRETIAKOVA',
];

const films = [
    'Побег из Шоушенка', 'Звёздные войны: Эпизод V - Империя наносит ответный удар', 'Начало', 'Зеленая миля', 'Властелин колец: Братство кольца', 'Темный рыцарь', 'Интерстеллар',
];

const books = [
    'Гарри Поттер и философский камень', 'Преступление и наказание', 'Война миров',
];

onMounted(() => {
  const url = window.location.href;
  if (window.location.href.includes('#')) {
    const lastParam = url.split("#").slice(-1)[0];
    document.getElementById(lastParam).scrollIntoView();
  }
});
</script>

<template>
  <div class="interests">
    <div class="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div class="absolute inset-0 -z-10 overflow-hidden">
        <svg class="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]" aria-hidden="true">
          <defs>
            <pattern id="e813992c-7d03-4cc4-a2bd-151760b470a0" width="200" height="200" x="50%" y="-1" patternUnits="userSpaceOnUse">
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y="-1" class="overflow-visible fill-gray-50">
            <path d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z" stroke-width="0" />
          </svg>
          <rect width="100%" height="100%" stroke-width="0" fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
        </svg>
      </div>

      <div class="xl:mr-[15.5rem]">
        <div class="relative overflow-hidden bg-white xl:mr-[15.5rem]">
          <div id="hobbie" class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
            <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
              <div class="sm:max-w-lg">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Мое хобби</h1>
                <p class="mt-4 text-xl text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis purus nec ante suscipit pretium. Vivamus feugiat, metus quis ultricies malesuada, justo mauris convallis augue, nec aliquet libero nisl vel libero.
                </p>
              </div>
              <div>
                <div class="mt-10">
                  <div aria-hidden="true" class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                    <div class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div class="flex items-center space-x-6 lg:space-x-8">
                        <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 transform scale-110 -rotate-6">
                            <img src="/hamster_1.png" alt="" class="h-full w-full object-cover object-center">
                          </div>
                          <div class="h-64 w-44 overflow-hidden rounded-lg transform scale-75 rotate-6">
                            <img src="/hamster_2.png" alt="" class="h-full w-full object-cover object-center">
                          </div>
                        </div>
                        <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div class="h-64 w-44 overflow-hidden rounded-lg">
                            <img src="/hamster_4.png" alt="" class="h-full w-full object-cover object-center">
                          </div>
                          <div class="h-64 w-44 overflow-hidden rounded-lg">
                            <img src="/hamster_3.png" alt="" class="h-full w-full object-cover object-center">
                          </div>
                        </div>
                        <div class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div class="h-64 w-44 overflow-hidden rounded-lg transform translate-x-20 translate-y-4 rotate-6">
                            <img src="/hamster_5.png" alt="" class="h-full w-full object-cover object-center">
                          </div>
                          <div class="h-64 w-44 overflow-hidden rounded-lg -rotate-3">
                            <img src="/hamster_6.png" alt="" class="h-full w-full object-cover object-center">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="books" class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
          <div class="lg:columns-2 px-10">
            <div class="w-full">
              <div class="flex justify-end">
                <div class="max-w-full">
                  <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                    Мои любимые книги
                  </h1>
                  <ul v-for="book in books" class="marker:text-sky-400 list-disc space-y-3 text-xl text-gray-500">
                    <li>{{ book }}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="w-full pt-10 lg:pt-0">
              <div class="flex justify-start">
                <img src="/read_book.png" alt="404" class="rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        <div id="music" class="pb-80 pt-16 sm:pb-40 sm:pt-24 px-4 sm:px-20 lg:pb-48 lg:pt-40 lg:px-40">
          <div class="w-full">
            <div class="flex justify-center">
              <div class="max-w-full">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Моя любимая музыка
                </h1>

                <div class="pt-4">
                  <ul v-for="mus in music" class="list-inside list-decimal text-xl text-gray-500 space-y-1">
                    <li>
                      {{ mus }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="films" class="pb-80 pt-16 sm:pb-40 sm:pt-24 px-4 sm:px-20 lg:pb-48 lg:pt-40 lg:px-40">
          <div class="w-full">
            <div class="flex">
              <div class="max-w-full">
                <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Мои любимые фильмы
                </h1>

                <div class="grid grid-cols-2 gap-4">
                  <div class="pt-4">
                    <ul v-for="film in films" class="list-inside list-disc text-xl text-gray-500 space-y-1">
                      <li>
                        {{ film }}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <img src="/tv.png" alt="404" class="h-52 w-auto rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="fixed z-20 top-[3.8125rem] bottom-0 right-4 w-[14rem] py-10 overflow-y-auto hidden xl:block">
        <div class="px-8">
          <h5 class="text-slate-900 font-semibold mb-4 text-sm leading-6100">
            Навигация по данной странице
          </h5>

          <ul class="text-slate-700 text-sm leading-6">
            <li>
              <a href="#hobbie" class="group flex items-start py-1 hover:text-slate-900">
                <svg width="3" height="24" viewBox="0 -9 3 24" class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600">
                  <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
                Моё хобби
              </a>
            </li>
            <li>
              <a href="#books" class="group flex items-start py-1 hover:text-slate-900">
                <svg width="3" height="24" viewBox="0 -9 3 24" class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600">
                  <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
                Мои любимые книги
              </a>
            </li>
            <li>
              <a href="#music" class="group flex items-start py-1 hover:text-slate-900">
                <svg width="3" height="24" viewBox="0 -9 3 24" class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600">
                  <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
                Моя любимая музыка
              </a>
            </li>
            <li>
              <a href="#films" class="group flex items-start py-1 hover:text-slate-900">
                <svg width="3" height="24" viewBox="0 -9 3 24" class="mr-2 text-slate-400 overflow-visible group-hover:text-slate-600">
                  <path d="M0 0L3 3L0 6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                </svg>
                Мои любимые фильмы
              </a>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>