<script setup>
import { ref } from "vue";

const formSubmitted = ref(false);
const nameInput = ref('');
const genderInput = ref('');
const ageInput = ref('1');
const emailInput = ref('');
const phoneInput = ref('');

const message = ref('');

const submitForm = () => {
  formSubmitted.value = true;

  if (!nameInput.value) {
    message.value = 'Пожалуйста, введите ФИО';
    return;
  } else if (!validateFullName(nameInput.value)) {
    message.value = 'Пожалуйста, введите корректное ФИО';
    return;
  } else if (!genderInput.value) {
    message.value = 'Пожалуйста, выберите пол';
    return;
  } else if (!ageInput.value) {
    message.value = 'Пожалуйста, выберите возраст';
    return;
  } else if (!emailInput.value) {
    message.value = 'Пожалуйста, введите E-mail';
    return;
  } else if (!emailInput.value || !validateEmail(emailInput.value)) {
    message.value = 'Пожалуйста, введите E-mail корректно';
    return;
  } else if (!phoneInput.value) {
    message.value = 'Пожалуйста, введите телефон';
    return;
  } else if (!validatePhoneNumber(phoneInput.value)) {
    message.value = 'Пожалуйста, введите корректный номер телефона';
    return;
  }

  if (formSubmitted.value) {
    message.value = 'Форма успешно отправлена!';
  }
};

function validateFullName(name) {
  const regex = /^[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+\s[а-яА-ЯёЁ]+$/;
  return regex.test(name);
}

function validatePhoneNumber(phone) {
  const regex = /^(?:\+7|\+3)[0-9]{9,11}$/;
  return regex.test(phone);
}

function validateEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}
</script>

<template>
  <div class="contacts">
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
        <div class="px-4 sm:px-0">
          <h3 class="text-base font-semibold leading-7 text-gray-900">Оставить сообщение</h3>
          <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Отправьте сообщение нам на почту.</p>
        </div>

        <div v-if="message" class="sm:col-span-4">
          <p :class="message === 'Форма успешно отправлена!' ? 'text-green-500' : 'text-rose-500'">{{ message }}</p>
        </div>

        <form @submit.prevent="submitForm">
          <div class="mt-6 border-t border-gray-100">
            <div class="divide-y divide-gray-100">
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="name" class="text-sm font-medium leading-6 text-gray-900">
                  ФИО
                </label>
                <input v-model="nameInput" class="block w-full border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white" name="name" maxlength="255" required="required" type="text">
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="gender" class="text-sm font-medium leading-6 text-gray-900">
                  Пол
                </label>
                <div class="space-x-5">
                  <label>
                    <input v-model="genderInput" name="gender" type="radio" class="accent-amber-600" value="М" required="required">М
                  </label>
                  <label>
                    <input v-model="genderInput" name="gender" type="radio" class="accent-amber-600" value="Ж" required="required">Ж
                  </label>
                </div>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="age" class="text-sm font-medium leading-6 text-gray-900">
                  Возраст
                </label>
                <div>
                  <select v-model="ageInput" name="age" class="appearance-none ring-1 ring-gray-400 px-2 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg" required="required">
                    <option value="1">До 18</option>
                    <option value="2">18-20</option>
                    <option value="3">20-45</option>
                    <option value="4">Более 45</option>
                  </select>
                </div>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <p class="text-sm font-medium leading-6 text-gray-900">
                  E-mail
                </p>
                <input v-model="emailInput" class="block w-full border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white" name="email" maxlength="255" required="required" type="email">
              </div>

              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="name" class="text-sm font-medium leading-6 text-gray-900">
                  Телефон
                </label>
                <input v-model="phoneInput" class="block w-full border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white" name="phone" maxlength="12" required="required" type="tel">
              </div>
            </div>
          </div>

          <div>
            <button @click="submitForm" type="submit" class="relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-500/50">
              Отправить
            </button>

            <button type="reset" class="ml-4 relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 ring-1 ring-gray-950/10">
              Очистить
            </button>
          </div>

        </form>
      </div>

    </div>
  </div>
</template>