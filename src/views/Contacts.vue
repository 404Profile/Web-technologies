<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";

const formSubmitted = ref(false);
const nameInput = ref('');
const genderInput = ref('М');
const ageInput = ref('1');
const emailInput = ref('');
const phoneInput = ref('');
const birthday = ref('');

const isOpenBirthdayModal = ref(false);
const message = ref('');
const isButtonDisabled = ref(false);

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
  } else if (!birthday.value) {
    message.value = 'Пожалуйста, введите дату рождения';
    return;
  }

  if (formSubmitted.value) {
    message.value = 'Форма успешно отправлена!';
  }
};

const errorNameInput = ref(false);
const errorEmailInput = ref(false);
const errorPhoneInput = ref(false);
const errorBirthday = ref(false);
const validNameInput = ref(false);
const validEmailInput = ref(false);
const validPhoneInput = ref(false);
const validBirthday = ref(false);

const validateNameInput = () => {
  errorNameInput.value = !nameInput.value || !validateFullName(nameInput.value);
  validNameInput.value = !errorNameInput.value;
}

const validateEmailInput = () => {
  errorEmailInput.value = !emailInput.value || !validateEmail(emailInput.value);
  validEmailInput.value = !errorEmailInput.value;
}

const validatePhoneInput = () => {
  errorPhoneInput.value = !phoneInput.value || !validatePhoneNumber(phoneInput.value);
  validPhoneInput.value = !errorPhoneInput.value;
}

const validateBirthday = () => {
  errorBirthday.value = !birthday.value;
  validBirthday.value = !errorBirthday.value;
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

const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const selectedYear = ref(new Date().getFullYear());
const selectedMonthIndex = ref(new Date().getMonth());
const selectedMonth = ref(monthNames[new Date().getMonth()]);
const daysByMonth = ref([]);
const selectedDay = ref(null);

const getDaysInMonth = () => {
  const daysInMonth = new Date(selectedYear.value, selectedMonthIndex.value + 1, 0).getDate();
  const firstDay = new Date(selectedYear.value, selectedMonthIndex.value, 1).getDay() || 7;

  const daysArray = [];
  let dayOfWeek = firstDay - 1;

  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push({
      day: i,
      dayOfWeek: days[dayOfWeek]
    });

    dayOfWeek = (dayOfWeek + 1) % 7;
  }

  daysByMonth.value = daysArray;
};

onMounted(getDaysInMonth);

watchEffect(() => {
  getDaysInMonth();
});

watch([selectedYear, selectedMonth], () => {
  selectedMonthIndex.value = monthNames.indexOf(selectedMonth.value);
  getDaysInMonth();
});

const weeks = () => {
  const weeks = [];
  let week = [];
  const startDay = startMonthDay(daysByMonth.value);

  for (let i = 0; i < startDay; i++) {
    week.push({ day: null });
  }

  daysByMonth.value.forEach((day, index) => {
    week.push(day);
    if ((index + startDay + 1) % 7 === 0) {
      weeks.push(week);
      week = [];
    }
  });

  if (week.length > 0) {
    while (week.length < 7) {
      week.push({ day: null });
    }
    weeks.push(week);
  }

  return weeks;
}

const startMonthDay = (week) => {
  switch (week[0].dayOfWeek) {
    case 'Пн':
      return 0;
    case 'Вт':
      return 1;
    case 'Ср':
      return 2;
    case 'Чт':
      return 3;
    case 'Пт':
      return 4;
    case 'Сб':
      return 5;
    case 'Вс':
      return 6;
    default:
      return 0;
  }
}

watch([selectedYear, selectedMonth, selectedDay], () => {
  if (!selectedYear.value || !selectedMonth.value || !selectedDay.value) {
    birthday.value = '';
  } else {
    birthday.value = selectedDay.value.toString() + '.' + (monthNames.indexOf(selectedMonth.value) + 1).toString() + '.' + selectedYear.value.toString();
  }
});

watch(isOpenBirthdayModal, () => {
  if (isOpenBirthdayModal.value === false) {
    validateBirthday();
  }
});

const allConditionsMet = ref(null);

watch([nameInput, emailInput, phoneInput, birthday], () => {
  allConditionsMet.value = validNameInput.value && validEmailInput.value && validPhoneInput.value && birthday.value;

  if (allConditionsMet.value) {
    isButtonDisabled.value = true;
  } else {
    isButtonDisabled.value = false;
  }

  // Вопрос
  // isButtonDisabled.value = !!allConditionsMet.value;
  //
});
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
                <input v-model="nameInput" @focusout="validateNameInput" :class="errorNameInput ? 'border-red-500 border-2' : validNameInput ? 'border-green-500 border-2' : 'border-none'" class="block w-full py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white" name="name" maxlength="255" required="required" type="text">
                <p v-if="errorNameInput" class="text-red-600">Ошибка привильности ввода ФИО. Могут быть только русские буквы и формат Ф И О</p>
              </div>
              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="gender" class="text-sm font-medium leading-6 text-gray-900">
                  Пол<span class="text-red-600 text-xl">*</span>
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
                <input @focusout="validateEmailInput" v-model="emailInput" :class="errorEmailInput ? 'border-red-500 border-2' : validEmailInput ? 'border-green-500 border-2' : 'border-none'" class="block w-full py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white" name="email" maxlength="255" required="required" type="email">
                <p v-if="errorEmailInput" class="text-red-600">Ошибка привильности ввода E-mail. Почта должна иметь вид: name@example.com</p>
              </div>

              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="phone" class="text-sm font-medium leading-6 text-gray-900">
                  Телефон<span class="text-red-600 text-xl">*</span>
                </label>
                <input @focusout="validatePhoneInput" v-model="phoneInput" :class="errorPhoneInput ? 'border-red-500 border-2' : validPhoneInput ? 'border-green-500 border-2' : 'border-none'" class="block w-full py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white" name="phone" maxlength="12" required="required" type="tel">
                <p v-if="errorPhoneInput" class="text-red-600">Ошибка привильности ввода телефна. Должно быть от 9 до 11 символов и код +3 или +7</p>
              </div>

              <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label for="birthday" class="text-sm font-medium leading-6 text-gray-900">
                  Дата рождения<span class="text-red-600 text-xl">*</span>
                  <span class="block">{{ birthday }}</span>
                </label>

                <div class="relative">
                  <div @click="isOpenBirthdayModal = true">
                    <div :class="errorBirthday ? 'border-red-500 border-2' : validBirthday ? 'border-green-500 border-2' : 'border-none'" class="block px-4 w-full h-9 py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-gray-100">
                      {{ selectedDay }} {{ selectedMonth }} {{ selectedYear }} ({{ birthday }})
                    </div>
                  </div>

                  <div v-if="isOpenBirthdayModal" class="absolute left-1/2 z-10 pt-5 w-screen max-w-max -translate-x-1/2 px-4 -top-[19.5rem] lg:top-5">
                    <div class="relative w-screen max-w-sm flex-auto overflow-hidden rounded-xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                      <div class="absolute right-3 top-3">
                        <button type="button" @click="isOpenBirthdayModal = false" class="appearance-none hover:text-gray-800 cursor-pointer">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                          </svg>
                        </button>
                      </div>
                      <div class="p-4">
                        <div class="flex justify-around">
                          <select v-model="selectedMonth" class="block min-w-20 px-4 border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white">
                            <option v-for="month in monthNames" :selected="selectedMonth === month" :value="month" class="w-full p-4">
                              {{ month }}
                            </option>
                          </select>

                          <select v-model="selectedYear" class="ml-4 sm:ml-0 block min-w-20 px-4 border-none py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-white">
                            <option v-for="n in 100" :selected="(1924 + n) === selectedYear" class="w-full p-4">
                              {{ 1924 + n }}
                            </option>
                          </select>
                        </div>

                        <table class="table-auto w-full border-separate border-spacing-1">
                          <thead class="border-b">
                          <tr>
                            <th v-for="dayName in days" :key="dayName">
                              {{ dayName }}
                            </th>
                          </tr>
                          </thead>
                          <tbody>
                          <tr class="week" v-for="(week, index) in weeks()" :key="index">
                            <td v-for="n in startMonthDay(week)" class="border-[1px] border-slate-700 w-7 text-center min-w-7"></td>
                            <td v-for="day in week" :key="day.day" @click="selectedDay = day.day" class="w-7 text-center min-w-7 day hover:font-bold hover:text-md hover:text-red-600 hover:bg-gray-100 cursor-pointer">
                              <button type="button" @click="selectedDay = day.day" class="focus:outline-none">
                                {{ day.day }}
                              </button>
                            </td>
                          </tr>
                          </tbody>
                        </table>

                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div>
            <button :disabled="isButtonDisabled === false" @click="submitForm" type="submit" class="disabled:cursor-not-allowed relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus-visible:ring-2 rounded-lg gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-amber-600 text-white hover:bg-amber-500 focus-visible:ring-amber-500/50">
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