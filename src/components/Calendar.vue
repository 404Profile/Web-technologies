<script setup>
import {onMounted, ref, watch, watchEffect} from "vue";

const emit = defineEmits(['birthday']);

const birthday = ref('');
const isOpenBirthdayModal = ref(false);

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
  emit('birthday', birthday.value)
});
</script>

<template>
  <div class="relative">
    <div @click="isOpenBirthdayModal = true">
      <div class="block px-4 w-full h-9 py-1.5 text-base text-gray-950 transition duration-75 placeholder:text-gray-400 appearance-none ring-1 ring-gray-400 focus:ring-2 focus:ring-amber-600 focus:outline-none rounded-lg sm:text-sm sm:leading-6 bg-gray-100">
        {{ selectedDay }} {{ selectedMonth }} {{ selectedYear }} {{ birthday ? '(' + birthday + ')' : '' }}
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
</template>