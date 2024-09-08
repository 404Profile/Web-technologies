<script setup>
import {RouterLink} from "vue-router";
</script>

<template>
  <div class="home">
    <div class="relative isolate px-6 pt-14 lg:px-8">
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
      <div class="mx-auto max-w-2xl py-24">
        <div class="sm:mb-8 flex justify-center">
          <img src="/general.png" alt="404" class="rounded-lg sm:w-2/3 h-auto" />
        </div>
        <div class="text-center">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900">
            Бойко Игорь Владимирович
          </h1>
          <p class="mt-4 text-lg leading-8 text-gray-600">
            ПИ/б-22-1
          </p>
          <p class="mt-4 text-lg leading-8 font-semibold text-indigo-500">
            Лабораторная работа №1
          </p>
          <p class="text-slate-900 text-2xl tracking-tight font-extrabold">
            “Исследование возможностей языка разметки гипертекстов HTML и каскадных таблиц стилей CSS”
          </p>
          <div class="mt-10 flex items-center justify-center gap-x-6">
            <RouterLink to="/test" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Начать тест
            </RouterLink>
            <RouterLink to="/about" class="text-sm font-semibold leading-6 text-gray-900 hover:underline hover:underline-offset-1">
              Узнать больше обо мне <span>→</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
