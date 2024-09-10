<script setup>
import {ref} from "vue";

const visitsHome = ref(localStorage.getItem('pageVisits-home'));
const visitsAbout = ref(localStorage.getItem('pageVisits-about'));
const visitsInterests = ref(localStorage.getItem('pageVisits-interests'));
const visitsStudy = ref(localStorage.getItem('pageVisits-study'));
const visitsPhoto = ref(localStorage.getItem('pageVisits-photo'));
const visitsContacts = ref(localStorage.getItem('pageVisits-contacts'));
const visitsTest = ref(localStorage.getItem('pageVisits-test'));
const visitsHistory = ref(localStorage.getItem('pageVisits-history'));

function getCookie(name) {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split('; ');

  for (let cookie of cookieArray) {
    const [cookieName, cookieValue] = cookie.split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }

  return null;
}

const visitsCookieHome = ref(getCookie('pageVisits-home'));
const visitsCookieAbout = ref(getCookie('pageVisits-about'));
const visitsCookieInterests = ref(getCookie('pageVisits-interests'));
const visitsCookieStudy = ref(getCookie('pageVisits-study'));
const visitsCookiePhoto = ref(getCookie('pageVisits-photo'));
const visitsCookieContacts = ref(getCookie('pageVisits-contacts'));
const visitsCookieTest = ref(getCookie('pageVisits-test'));
const visitsCookieHistory = ref(getCookie('pageVisits-history'));
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
              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Главная</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsHome }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Обо мне</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsAbout }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Мои интересы</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsInterests }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Учеба</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsStudy }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Фотоальбом</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsPhoto }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Контакты</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsContacts }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Тест</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsTest }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">История</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsHistory }}</span>
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
              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Главная</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieHome }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Обо мне</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieAbout }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Мои интересы</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieInterests }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Учеба</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieStudy }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Фотоальбом</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookiePhoto }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Контакты</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieContacts }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">Тест</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieTest }}</span>
                </td>
              </tr>

              <tr class="hover:bg-gray-100">
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">История</span>
                </td>
                <td class="border border-slate-700 px-2">
                  <span class="text-sm text-gray-950 font-medium">{{ visitsCookieHistory }}</span>
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