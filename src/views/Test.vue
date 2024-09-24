<script setup>
import {ref, watch} from "vue";
import PopUp from "@/components/PopUp.vue";

const formSubmitted = ref(false);
const correctAnswers = ref(0);
const inputtedAnswers = ref(0);
const message = ref('');
const nameInput = ref('');
const counterChecked = ref(0);
const formSent = ref(false);
const isButtonDisabled = ref(false);
const errors = ref([]);

const validNameInput = ref(null);

const validateNameInput = () => {
  validNameInput.value = validateFullName(nameInput.value)

  const errorIndex = errors.value.findIndex(error => error.name === 'nameInput');

  if (!validNameInput.value && errorIndex === -1) {
    errors.value.push({ name: 'nameInput', message: 'Ошибка ввода ФИО. Допускаются только русские буквы и должно быть три слова' });
  } else if (validNameInput.value && errorIndex !== -1) {
    errors.value.splice(errorIndex, 1);
  }
}

function validateFullName(name) {
  const regex = /^[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+$/;
  return regex.test(name);
}

const answers = [
  { id: "ask-1", correct: "Вода" },
  { id: "ask-2", correct: "Человек" },
  { id: "wolf", correct: true },
  { id: "rabbit", correct: false },
  { id: "bear", correct: true }
];

watch([validNameInput], () => {
  isButtonDisabled.value = validNameInput.value;
});

const submitForm = () => {
  formSubmitted.value = true;
  formSent.value = false;
  correctAnswers.value = 0;
  inputtedAnswers.value = 0;
  counterChecked.value = 0;
  isConfirmSendForm.value = false;

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

const reset = () => {
  nameInput.value = '';
  message.value = '';
  formSent.value = false;
  errors.value = [];
  isButtonDisabled.value = false;
}

const getNamedError = (errorName) => {
  if (errors.value.length) {
    return !!errors.value.find(error => error.name === errorName);
  } else {
    return false;
  }
}

const getError = (errorName) => {
  return errors.value.find(error => error.name === errorName);
}

const isConfirmSendForm = ref(false);
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
                  <div class="mt-2 flex">
                      <div class="sm:w-96 flex shadow-sm rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 sm:max-w-md">
                        <span class="flex select-none items-center pl-3 text-gray-700 sm:text-sm">ФИО: </span>
                        <input v-model="nameInput" @blur="validateNameInput" type="text" name="name" id="name" placeholder="введите ФИО" required
                               class="focus:outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                      </div>
                      <PopUp>
                        <template #svg>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                          </svg>
                        </template>
                        <template #content>
                          ФИО должно быть только из русских букв и состоять из трех слов.
                        </template>
                      </PopUp>
                  </div>
                  <p v-if="getNamedError('nameInput')" class="text-red-500">{{ getError('nameInput').message }}</p>
                </div>

                <div class="sm:col-span-3">
                  <label for="ask-1" class="block text-sm font-medium leading-6 text-gray-900">Какой из перечисленных факторов НЕ является биотическим элементом экосистемы? (Вода)</label>
                  <div class="mt-2">
                    <select id="ask-1" name="ask-1" class="w-min px-3 appearance-none block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-amber-600 focus:outline-none sm:max-w-xs sm:text-sm sm:leading-6" required>
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
                    <div class="sm:w-96 flex shadow-sm rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-amber-600 sm:max-w-md">
                      <span class="flex select-none items-center pl-3 text-gray-700 sm:text-sm">Ответ: </span>
                      <input type="text" name="ask-2" id="ask-2" class="focus:outline-none block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="введите ответ">
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
            <button :disabled="!isButtonDisabled" type="button" @click="isConfirmSendForm = true" class="disabled:cursor-not-allowed relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-500/50">
              Отправить
            </button>
          </div>

        </form>
      </div>

    </div>

    <div v-if="isConfirmSendForm" class="relative z-10">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900">
                    Точно отправить тест?
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Вы уверены, что хотите отправить тест? Все пропушенные вопросы будут оценены в 0.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button @click="submitForm" type="button" class="inline-flex w-full justify-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 sm:ml-3 sm:w-auto">
                Отпрвить
              </button>
              <button @click="isConfirmSendForm = false" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                Отменить
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>