<script setup>
import {ref, watch} from "vue";
import Calendar from "@/components/Calendar.vue";
import PopUp from "@/components/PopUp.vue";

const formSubmitted = ref(false);
const nameInput = ref('');
const genderInput = ref('М');
const ageInput = ref('1');
const emailInput = ref('');
const phoneInput = ref('');
const birthday = ref('');
const errors = ref([]);

const message = ref('');
const isButtonDisabled = ref(false);

const submitForm = () => {
  formSubmitted.value = true;

  if (formSubmitted.value) {
    message.value = 'Форма успешно отправлена!';
  }
};

const validNameInput = ref(null);
const validEmailInput = ref(null);
const validPhoneInput = ref(null);
const validBirthday = ref(null);

const validateNameInput = () => {
  validNameInput.value = validateFullName(nameInput.value)

  const errorIndex = errors.value.findIndex(error => error.name === 'nameInput');

  if (!validNameInput.value && errorIndex === -1) {
    errors.value.push({ name: 'nameInput', message: 'Ошибка ввода ФИО. Допускаются только русские буквы и должно быть три слова' });
  } else if (validNameInput.value && errorIndex !== -1) {
    errors.value.splice(errorIndex, 1);
  }
}

const validateEmailInput = () => {
  validEmailInput.value = validateEmail(emailInput.value);

  const errorIndex = errors.value.findIndex(error => error.name === 'emailInput');

  if (!validEmailInput.value && errorIndex === -1) {
    errors.value.push({ name: 'emailInput', message: 'Ошибка ввода email. Почта должна быть формата example@example.com' });
  } else if (validEmailInput.value && errorIndex !== -1) {
    errors.value.splice(errorIndex, 1);
  }
}

const validatePhoneInput = () => {
  validPhoneInput.value = validatePhoneNumber(phoneInput.value);

  const errorIndex = errors.value.findIndex(error => error.name === 'phoneInput');

  if (!validPhoneInput.value && errorIndex === -1) {
    errors.value.push({ name: 'phoneInput', message: 'Ошибка ввода телефона. Должно начинаться с +3 или +7 и иметь от 9 до 11 чисел' });
  } else if (validPhoneInput.value && errorIndex !== -1) {
    errors.value.splice(errorIndex, 1);
  }
}

const validateBirthday = () => {
  validBirthday.value = !!birthday.value;

  const errorIndex = errors.value.findIndex(error => error.name === 'birthday');

  if (!validBirthday.value && errorIndex === -1) {
    errors.value.push({ name: 'birthday', message: 'Ошибка ввода дня рождения' });
  } else if (validBirthday.value && errorIndex !== -1) {
    errors.value.splice(errorIndex, 1);
  }
}

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

watch(birthday, () => {
  validateBirthday();
});

watch([validNameInput, validEmailInput, validPhoneInput, validBirthday], () => {
  isButtonDisabled.value = validNameInput.value && validEmailInput.value && validPhoneInput.value && validBirthday.value;
});

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

const resetForm = () => {
  nameInput.value = '';
  genderInput.value = 'М';
  ageInput.value = '1';
  emailInput.value = '';
  phoneInput.value = '';
  setBirthday();
  errors.value = [];
  validNameInput.value = null;
  validEmailInput.value = null;
  validPhoneInput.value = null;
  validBirthday.value = null;
  message.value = '';
  isButtonDisabled.value = false;
}

const setBirthday = () => {
  birthday.value = '';
};
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
                  ФИО<span class="text-red-600 text-xl">*</span>
                </label>
                <div>
                  <div class="flex">
                    <input v-model="nameInput" @blur="validateNameInput"
                           :class="validNameInput === true ? 'border-green-500 border-2' : validNameInput === false ? 'border-red-500 border-2' : ''"
                           class="border-0 block w-full py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white"
                           name="name" maxlength="255" required="required" type="text">

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
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="gender" class="text-sm font-medium leading-6 text-gray-900">
                  Пол<span class="text-red-600 text-xl">*</span>
                </label>
                <div class="space-x-5">
                  <label>
                    <input v-model="genderInput" :checked="genderInput === 'М'" name="gender" type="radio" class="accent-amber-600" value="М" required="required">М
                  </label>
                  <label>
                    <input v-model="genderInput" :checked="genderInput === 'Ж'" name="gender" type="radio" class="accent-amber-600" value="Ж" required="required">Ж
                  </label>
                </div>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="age" class="text-sm font-medium leading-6 text-gray-900">
                  Возраст<span class="text-red-600 text-xl">*</span>
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
                <label for="email" class="text-sm font-medium leading-6 text-gray-900">
                  E-mail<span class="text-red-600 text-xl">*</span>
                </label>
                <div>
                  <div class="flex">
                    <input @blur="validateEmailInput" v-model="emailInput"
                           :class="validEmailInput === true ? 'border-green-500 border-2' : validEmailInput === false ? 'border-red-500 border-2' : ''"
                           class="block w-full py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white"
                           name="email" maxlength="255" required="required" type="email">

                    <PopUp>
                      <template #svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                      </template>
                      <template #content>
                        Почта должна иметь формат example@example.com
                      </template>
                    </PopUp>
                  </div>
                  <p v-if="getNamedError('emailInput')" class="text-red-500">{{ getError('emailInput').message }}</p>
                </div>
              </div>

              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="phone" class="text-sm font-medium leading-6 text-gray-900">
                  Телефон<span class="text-red-600 text-xl">*</span>
                </label>
                <div>
                  <div class="flex">
                    <input @blur="validatePhoneInput" v-model="phoneInput"
                           :class="validPhoneInput === true ? 'border-green-500 border-2' : validPhoneInput === false ? 'border-red-500 border-2' : ''"
                           class="block w-full py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white"
                           name="phone" maxlength="12" required="required" type="tel">
                    <PopUp>
                      <template #svg>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 stroke-2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                      </template>
                      <template #content>
                        Номер телефона должен начинаться с +3 или +7 и быть длиной от 9 до 11 символов.
                      </template>
                    </PopUp>
                  </div>
                  <p v-if="getNamedError('phoneInput')" class="text-red-500">{{ getError('phoneInput').message }}</p>
                </div>
              </div>

              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="birthday" class="text-sm font-medium leading-6 text-gray-900">
                  Дата рождения<span class="text-red-600 text-xl">*</span>
                  <span class="block">{{ birthday }}</span>
                </label>

                <Calendar @birthday="(data) => birthday = data" />

              </div>
            </div>
          </div>

          <div>
            <button :disabled="!isButtonDisabled" @click="submitForm" type="submit" class="disabled:cursor-not-allowed relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-500/50">
              Отправить
            </button>

            <button type="button" @click="resetForm" class="ml-4 relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 ring-1 ring-gray-950/10">
              Очистить
            </button>
          </div>

        </form>
      </div>

    </div>
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