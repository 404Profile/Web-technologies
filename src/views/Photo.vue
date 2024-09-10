<script setup>
import {ref} from "vue";

const fotos = [
    'ham.png', '1.png', '2.png', '3.png', '4.png', 'ham.png', '1.png', '2.png', '3.png', '4.png', 'ham.png', '1.png', '2.png', '3.png', '4.png',
];
const tiles = [
    'Хомяк в кепке', 'Хомяк стоит', 'Хомяк на двух лапах', 'Хомяк на двух лапах 2', 'Хомяк с разных сторон', 'Хомяк в кепке', 'Хомяк стоит', 'Хомяк на двух лапах', 'Хомяк на двух лапах 2', 'Хомяк с разных сторон', 'Хомяк в кепке', 'Хомяк стоит', 'Хомяк на двух лапах', 'Хомяк на двух лапах 2', 'Хомяк с разных сторон',
];

const allPhotos = fotos.map((foto, index) => ({ foto, title: tiles[index] }));

const isOpenModalPhoto = ref(false);
const currentPhoto = ref(null);

const openModalPhoto = (photo) => {
  currentPhoto.value = photo;
  isOpenModalPhoto.value = true;
  document.body.style.overflow = 'hidden';
}

const closeModalPhoto = () => {
  currentPhoto.value = null;
  isOpenModalPhoto.value = false;
  document.body.style = null;
}
</script>

<template>
  <div class="photo">
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
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 pb-10">
          Фотоальбом
        </h1>

        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div v-for="(photo, index) in allPhotos" class="group" @click="openModalPhoto(photo)">
            <div class="relative w-64 h-64 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img :src="'/photos/' + photo.foto" :alt="photo.title" :title="photo.title" class="absolute inset-0 h-full w-full object-cover object-center group-hover:opacity-75">
              <div class="opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10 flex justify-center items-end text-3xl text-black font-bold">
                {{ photo.title }}
              </div>
            </div>
            <h3 class="mt-4 text-md text-gray-800 font-semibold">{{ photo.title }}</h3>
          </div>
        </div>
      </div>

    </div>

    <div v-if="isOpenModalPhoto" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex items-end justify-center p-4 text-center sm:items-center sm:p-0 h-full">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full">
            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="flex justify-center">
                <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 class="text-base font-semibold leading-6 text-gray-900 text-center">Просмотр изображения в полном экране</h3>
                  <div class="mt-2 flex justify-center">
                    <img :src="'/photos/' + currentPhoto.foto" :alt="currentPhoto.title" :title="currentPhoto.title" class="w-5/6" />
                  </div>
                  <p class="text-2xl font-bold text-center text-black">
                    {{ currentPhoto.title }}
                  </p>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button @click="closeModalPhoto" type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                Закрыть
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>