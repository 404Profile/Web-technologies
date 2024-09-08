<script setup>
import {ref} from "vue";
import {RouterLink} from "vue-router";

const subjects = ref([
  { number: 1, name: 'Экология', hoursPerWeek: [null, null, null, null, null, null, 1, 0, 1, null, null, null] },
  { number: 2, name: 'Высшая математика', hoursPerWeek: [3, 0, 3, 3, 0, 3, 2, 0, 2, null, null, null] },
  { number: 3, name: 'Русский язык и культура речи', hoursPerWeek: [1, 0, 2, null, null, null, null, null, null, null, null, null] },
  { number: 4, name: 'Основы дискретной математики', hoursPerWeek: [2, 0, 1, 3, 0, 2, null, null, null, null, null, null] },
  { number: 5, name: 'Основы программирования и алгоритмические языки', hoursPerWeek: [3, 2, 0, 3, 3, 0, 0, 0, 1, null, null, null] },
  { number: 6, name: 'Основы экологии', hoursPerWeek: [null, null, null, null, null, null, 1, 0, 0, null, null, null] },
  { number: 7, name: 'Теория вероятностей и математическая статистика', hoursPerWeek: [null, null, null, null, null, null, 3, 1, 0, null, null, null] },
  { number: 8, name: 'Физика', hoursPerWeek: [2, 2, 0, 2, 2, 0, 2, 1, 0, null, null, null] },
  { number: 9, name: 'Основы электротехники и электроники', hoursPerWeek: [null, null, null, null, null, null, 2, 1, 0, null, null, null] },
  { number: 10, name: 'Численные методы в информатике', hoursPerWeek: [null, null, null, null, null, null, 2, 2, 0, 0, 0, 1] },
  { number: 11, name: 'Методы исследования операций', hoursPerWeek: [null, null, null, null, null, null, 1, 0, 0, 2, 1, 1] }
]);
</script>

<template>
  <div class="study">
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

      <div class="mx-10">
        <div class="max-w-full text-center pb-10">
          <h1 class="text-4xl font-bold tracking-tight text-gray-900">
            Севастопольский государственный университет
          </h1>
          <h2 class="text-3xl font-bold tracking-tight text-gray-900">
            Институт информационных технологий
          </h2>
        </div>

        <div class="divide-y divide-gray-200 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 p-6">
          <table class="table-auto border-collapse border border-slate-500 w-full">
            <caption class="caption-top text-left text-gray-800">
              Таблица 1 - Количество часов в неделю по дисциплинам
            </caption>
            <thead>
            <tr class="bg-gray-50">
              <th class="border border-slate-600 w-4 text-center text-sm font-semibold text-gray-950" rowspan="3">
                №
              </th>
              <th class="border border-slate-600 w-24 text-sm font-semibold text-gray-950 min-w-24" rowspan="3">
                Дисциплина
              </th>
              <th class="border border-slate-600 text-sm font-semibold text-gray-950 py-3" colspan="12">
                Часов в неделю (Лекций, Лаб.раб, Практ. раб)
              </th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-slate-600 text-sm font-semibold text-gray-950 py-3" colspan="6">
                1 курс
              </th>
              <th class="border border-slate-600 text-sm font-semibold text-gray-950 py-3" colspan="6">
                2 курс
              </th>
            </tr>
            <tr class="bg-gray-50">
              <th class="border border-slate-600 w-16 min-w-21 text-sm font-semibold text-gray-950 py-3" colspan="3">
                1 сем
              </th>
              <th class="border border-slate-600 w-16 min-w-21 text-sm font-semibold text-gray-950 py-3" colspan="3">
                2 сем
              </th>
              <th class="border border-slate-600 w-16 min-w-21 text-sm font-semibold text-gray-950 py-3" colspan="3">
                3 сем
              </th>
              <th class="border border-slate-600 w-16 min-w-21 text-sm font-semibold text-gray-950 py-3" colspan="3">
                4 сем
              </th>
            </tr>
            </thead>

            <tbody>
              <tr v-for="subject in subjects" class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2 w-4 text-center">
                  <span class="text-sm text-gray-950 font-medium w-20">
                    {{ subject.number }}
                  </span>
                </td>
                <td class="border border-slate-700 px-2 w-24">
                  <RouterLink to="/test" class="text-sm text-gray-950 font-medium" :class="subject.name === 'Основы экологии' ? 'underline decoration-2 decoration-amber-600' : ''">
                    {{ subject.name }}
                  </RouterLink>
                </td>
                <td v-for="hours in subject.hoursPerWeek" class="border border-slate-700 w-7 text-center min-w-7">
                  <span class="text-sm text-gray-950 font-medium">
                    {{ hours !== null ? hours : '' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>