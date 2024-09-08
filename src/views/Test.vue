<script setup>
import {ref} from "vue";

const formSubmitted = ref(false);
const correctAnswers = ref(0);
const inputtedAnswers = ref(0);
const message = ref('');
const nameInput = ref('');
const counterChecked = ref(0);
const formSent = ref(false);

const answers = [
  { id: "ask-1", correct: "Вода" },
  { id: "ask-2", correct: "Человек" },
  { id: "wolf", correct: true },
  { id: "rabbit", correct: false },
  { id: "bear", correct: true }
];

const submitForm = () => {
  formSubmitted.value = true;
  formSent.value = false;
  correctAnswers.value = 0;
  inputtedAnswers.value = 0;
  counterChecked.value = 0;

  if (!nameInput.value) {
    message.value = 'Пожалуйста, заполните поле ФИО';
    return;
  } else if (!validateFullName(nameInput.value)) {
    message.value = 'Пожалуйста, введите корректное ФИО';
    return;
  }

  answers.forEach(answer => {
    const element = document.getElementById(answer.id);
    const userInput = element.type === "checkbox" ? element.checked : element.value.trim();

    if (userInput === answer.correct) {
      correctAnswers.value += 1;
    }

    if (element.type === "checkbox") {
      if (element.checked) {
        counterChecked.value += 1;
      }
    }
  });

  if (formSubmitted.value) {
    if (correctAnswers.value === answers.length) {
      message.value = 'Все ответы верны';
      formSent.value = true;
    } else {
      message.value = 'Не все ответы верны';
      formSent.value = true;
    }
  }

  if (counterChecked.value > 2) {
    message.value = 'Выбрано более двух элементов в третьем вопросе';
    formSent.value = false;
  }
};

function validateFullName(name) {
  const regex = /^[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+$/;
  return regex.test(name);
}

const reset = () => {
  message.value = '';
  formSent.value = false;
}
</script>

<template>
  <div class="test">
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

      <div class="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <form @submit.prevent="submitForm">
          <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
              <h2 class="text-base font-semibold leading-7 text-gray-900">
                Тест
              </h2>
              <p class="mt-1 text-sm leading-6 text-gray-600">
                Тест по теме "Основы экологии"
              </p>

              <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="sm:col-span-4">
                  <div v-if="formSent">
                    {{ formSent ? 'Форма успешно отправлена' : 'Форма не отправлена из-за ошибок' }}
                  </div>
                  <div v-if="message">
                    <p :class="message === 'Все ответы верны' ? 'text-green-500' : 'text-rose-500'">{{ message }}</p>
                  </div>
                </div>

                <div class="sm:col-span-4">
                  <label for="name" class="block text-sm font-medium leading-6 text-gray-900">
                    Ваше ФИО:
                  </label>
                  <div class="mt-2">
                    <div class="flex shadow-sm rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 sm:max-w-md">
                      <span class="flex select-none items-center pl-3 text-gray-700 sm:text-sm">ФИО: </span>
                      <input v-model="nameInput" type="text" name="name" id="name" class="focus:outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="введите ФИО" required>
                    </div>
                  </div>
                </div>

                <div class="sm:col-span-3">
                  <label for="ask-1" class="block text-sm font-medium leading-6 text-gray-900">Какой из перечисленных факторов НЕ является биотическим элементом экосистемы? (Вода)</label>
                  <div class="mt-2">
                    <select id="ask-1" name="ask-1" class="px-3 appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:outline-none sm:max-w-xs sm:text-sm sm:leading-6" required>
                      <option>Растения</option>
                      <option>Животные</option>
                      <option>Почва</option>
                      <option>Вода</option>
                      <option>Микроорганизмы</option>
                      <option>Грибы</option>
                    </select>
                  </div>
                </div>

                <div class="sm:col-span-4">
                  <label for="ask-2" class="block text-sm font-medium leading-6 text-gray-900">
                    Укажите организм, занимающий вершину пищевой пирамиды: (Человек)
                  </label>
                  <div class="mt-2">
                    <div class="flex shadow-sm rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 sm:max-w-md">
                      <span class="flex select-none items-center pl-3 text-gray-700 sm:text-sm">Ответ: </span>
                      <input type="text" name="ask-2" id="ask-2" class="focus:outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="введите ответ" required>
                    </div>
                  </div>
                </div>

                <div class="sm:col-span-4">
                  <fieldset>
                    <legend class="text-sm font-semibold leading-6 text-gray-900">
                      Какие из перечисленных видов относятся к хищникам? (Волк, медведь)
                    </legend>
                    <div class="mt-6 space-y-6">
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input id="wolf" name="wolf" type="checkbox" class="accent-amber-600 h-4 w-4">
                        </div>
                        <div class="text-sm">
                          <label for="wolf" class="font-medium text-gray-900">
                            Волк
                          </label>
                        </div>
                      </div>
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input id="rabbit" name="rabbit" type="checkbox" class="accent-amber-600 h-4 w-4">
                        </div>
                        <div class="text-sm">
                          <label for="rabbit" class="font-medium text-gray-900">
                            Кролик
                          </label>
                        </div>
                      </div>
                      <div class="relative flex gap-x-3">
                        <div class="flex h-6 items-center">
                          <input id="bear" name="bear" type="checkbox" class="accent-amber-600 h-4 w-4">
                        </div>
                        <div class="text-sm">
                          <label for="bear" class="font-medium text-gray-900">
                            Медведь
                          </label>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="reset" @click="reset" class="ml-4 relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 ring-1 ring-gray-950/10">
              Очистить
            </button>
            <button type="submit" @click="submitForm" class="relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-500/50">
              Отправить
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>