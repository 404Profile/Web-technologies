<script setup>
import {ref} from "vue";
import {useVisitsStore} from "@/stores/visitsStore.js";

const visitsInLocaleStorage = ref(useVisitsStore().visitsInLocaleStorage);
const visitsInCookie = ref(useVisitsStore().visitsInCookie);
</script>

<template>
  <div class="history">
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
        <div class="divide-y divide-gray-200 overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 p-6">
          <div class="sm:grid sm:grid-cols-2 sm:gap-4 space-y-5 sm:space-y-0">
            <table class="table-auto border-collapse border border-slate-500 w-full">
              <caption class="caption-top text-left text-gray-800">
                Таблица 1 - История текущего сеанса в LocaleStorage
              </caption>
              <thead>
              <tr class="bg-gray-50">
                <th class="border border-slate-600 w-4 text-center text-sm font-semibold text-gray-950">Страница</th>
                <th class="border border-slate-600 w-4 text-center text-sm font-semibold text-gray-950">Посещения</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="visit of visitsInLocaleStorage" class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">
                    {{ visit.name }}
                  </span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">
                    {{ visit.count }}
                  </span>
                </td>
              </tr>
              </tbody>
            </table>

            <table class="table-auto border-collapse border border-slate-500 w-full">
              <caption class="caption-top text-left text-gray-800">
                Таблица 2 - История всех сеансов в Cookies
              </caption>
              <thead>
              <tr class="bg-gray-50">
                <th class="border border-slate-600 w-4 text-center text-sm font-semibold text-gray-950">Страница</th>
                <th class="border border-slate-600 w-4 text-center text-sm font-semibold text-gray-950">Посещения</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="visit of visitsInCookie" class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">
                    {{ visit.name }}
                  </span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">
                    {{ visit.count }}
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>