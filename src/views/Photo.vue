<script setup>
const fotos = [
    'ham.png', '1.png', '2.png', '3.png', '4.png', 'ham.png', '1.png', '2.png', '3.png', '4.png', 'ham.png', '1.png', '2.png', '3.png', '4.png',
];
const tiles = [
    'Хомяк в кепке', 'Хомяк стоит', 'Хомяк на двух лапах', 'Хомяк на двух лапах 2', 'Хомяк с разных сторон', 'Хомяк в кепке', 'Хомяк стоит', 'Хомяк на двух лапах', 'Хомяк на двух лапах 2', 'Хомяк с разных сторон', 'Хомяк в кепке', 'Хомяк стоит', 'Хомяк на двух лапах', 'Хомяк на двух лапах 2', 'Хомяк с разных сторон',
];

const allPhotos = fotos.map((foto, index) => ({ foto, title: tiles[index] }));
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
          <div v-for="(photo, index) in allPhotos" class="group">
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
  </div>
</template>