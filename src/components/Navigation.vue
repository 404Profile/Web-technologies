<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import {RouterLink, useRouter} from "vue-router";

const isOpenMobileNavigation = ref(false);
const route = useRouter();

const closeNavigation = () => {
  isOpenMobileNavigation.value = false;
}

const mouseEnter = (imageId, path) => {
  if (route.currentRoute.value.path !== path) {
    const elem = document.getElementById(imageId);
    elem.style.display = 'block'
  }
}

const mouseLeave = (imageId) => {
  const elem = document.getElementById(imageId);
  elem.style.display = 'none'
}

const goToElement = (id) => {
  if (route.currentRoute.value.name === 'interests') {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  } else {
    return null;
  }
}
const currentTime = ref(formatDate());

function formatDate() {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${hours} ${month} ${year}`;
}

const updateCurrentTime = () => {
  currentTime.value = formatDate();
  //console.log('Время обновилось');
};

let intervalId;

onMounted(() => {
  updateCurrentTime();
  intervalId = setInterval(updateCurrentTime, 1000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <header class="absolute inset-x-0 top-0 z-50">
    <nav class="flex items-center justify-end lg:justify-center p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:hidden">
        <button @click="isOpenMobileNavigation = true" type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink to="/" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image1', '/')" @mouseout="mouseLeave('image1')">
          <div id="image1" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          Главная
        </RouterLink>
        <RouterLink to="/about" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image2', '/about')" @mouseout="mouseLeave('image2')">
          <div id="image2" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 1 1 0-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 0 1-1.44-4.282m3.102.069a18.03 18.03 0 0 1-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 0 1 8.835 2.535M10.34 6.66a23.847 23.847 0 0 0 8.835-2.535m0 0A23.74 23.74 0 0 0 18.795 3m.38 1.125a23.91 23.91 0 0 1 1.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 0 0 1.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 0 1 0 3.46" />
            </svg>
          </div>
          Обо мне
        </RouterLink>
        <div class="relative group">
          <RouterLink to="/interests" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                      @mouseover="mouseEnter('image3', '/interests')" @mouseout="mouseLeave('image3')">
            <div id="image3" style="display: none;">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
            </div>
            Мои интересы
          </RouterLink>

          <div class="group-hover:flex hidden absolute left-1/2 z-10 pt-5 w-screen max-w-max -translate-x-1/2 px-4">
            <div class="w-screen max-w-sm flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
              <div class="p-4">
                <div class="relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div>
                    <RouterLink to="/interests#hobbie" @click="goToElement('hobbie')" class="font-semibold text-gray-900">
                      Моё хобби
                      <span class="absolute inset-0"></span>
                    </RouterLink>
                    <p class="mt-1 text-gray-600">
                      Узнайте моё хобби
                    </p>
                  </div>
                </div>
                <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div>
                    <RouterLink to="/interests#books" @click="goToElement('books')" class="font-semibold text-gray-900">
                      Мои любимые книги
                      <span class="absolute inset-0"></span>
                    </RouterLink>
                    <p class="mt-1 text-gray-600">
                      Узнайте мои любимые книги
                    </p>
                  </div>
                </div>
                <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div>
                    <RouterLink to="/interests#music" @click="goToElement('music')" class="font-semibold text-gray-900">
                      Моя любимая музыка
                      <span class="absolute inset-0"></span>
                    </RouterLink>
                    <p class="mt-1 text-gray-600">
                      Узнайте мои любимые песни
                    </p>
                  </div>
                </div>
                <div class="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                  <div>
                    <RouterLink to="/interests#films" @click="goToElement('films')" class="font-semibold text-gray-900">
                      Мои любимые фильмы
                      <span class="absolute inset-0"></span>
                    </RouterLink>
                    <p class="mt-1 text-gray-600">
                      Узнайте мои любимые фильмы
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <RouterLink to="/study" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image4', '/study')" @mouseout="mouseLeave('image4')">
          <div id="image4" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 10.5h.375c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125H21M4.5 10.5H18V15H4.5v-4.5ZM3.75 18h15A2.25 2.25 0 0 0 21 15.75v-6a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 1.5 9.75v6A2.25 2.25 0 0 0 3.75 18Z" />
            </svg>
          </div>
          Учеба
        </RouterLink>
        <RouterLink to="/photo" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image5', '/photo')" @mouseout="mouseLeave('image5')">
          <div id="image5" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
            </svg>
          </div>
          Фотоальбом
        </RouterLink>
        <RouterLink to="/contacts" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image6', '/contacts')" @mouseout="mouseLeave('image6')">
          <div id="image6" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
            </svg>
          </div>
          Контакты
        </RouterLink>
        <RouterLink to="/test" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image7', '/test')" @mouseout="mouseLeave('image7')">
          <div id="image7" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
            </svg>
          </div>
          Тест
        </RouterLink>
        <RouterLink to="/history" class="text-sm font-semibold leading-6 text-gray-900 flex pl-6 hover:pl-0" activeClass="pl-0 text-gray-900 font-bold"
                    @mouseover="mouseEnter('image8', '/interests')" @mouseout="mouseLeave('image8')">
          <div id="image8" style="display: none;">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
            </svg>
          </div>
          История
        </RouterLink>
      </div>

      <div class="text-sm font-semibold leading-6 text-gray-900 flex pl-6">
        | {{ currentTime }}
      </div>

    </nav>
  </header>
    
  <div v-if="isOpenMobileNavigation">
		<div class="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"></div>
		<div class="fixed z-50 inset-0 lg:hidden">
			<div class="fixed top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900">
				<button @click="closeNavigation" type="button" class="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600">
					<svg viewBox="0 0 10 10" class="w-2.5 h-2.5 overflow-visible" aria-hidden="true">
						<path d="M0 0L10 10M10 0L0 10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path>
					</svg>
				</button>
				<ul class="space-y-6">
					<li>
						<RouterLink to="/" @click="closeNavigation" class="hover:text-sky-500">
							Главная
						</RouterLink>
					</li>
					<li>
            <RouterLink to="/about" @click="closeNavigation" class="hover:text-sky-500">
							Обо мне
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/interests" @click="closeNavigation" class="hover:text-sky-500">
							Мои интересы
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/study" @click="closeNavigation" class="hover:text-sky-500">
							Учеба
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/photo" @click="closeNavigation" class="hover:text-sky-500">
							Фотоальбом
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/contacts" @click="closeNavigation" class="hover:text-sky-500">
							Контакт
            </RouterLink>
					</li>
					<li>
            <RouterLink to="/test" @click="closeNavigation" class="hover:text-sky-500">
							Тест
            </RouterLink>
					</li>
          <li>
            <RouterLink to="/history" @click="closeNavigation" class="hover:text-sky-500">
              История
            </RouterLink>
          </li>
				</ul>
			</div>
		</div>
	</div>
</template>