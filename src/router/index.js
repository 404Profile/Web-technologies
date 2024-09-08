import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import AboutMe from "@/views/AboutMe.vue";
import Contacts from "@/views/Contacts.vue";
import Interests from "@/views/Interests.vue";
import Photo from "@/views/Photo.vue";
import Study from "@/views/Study.vue";
import Test from "@/views/Test.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Главная' } },
    { path: '/about', name: 'about', component: AboutMe, meta: { title: 'Обо мне' } },
    { path: '/contacts', name: 'contacts', component: Contacts, meta: { title: 'Контакты' } },
    { path: '/interests', name: 'interests', component: Interests, meta: { title: 'Мои интересы' } },
    { path: '/photo', name: 'photo', component: Photo, meta: { title: 'Фотоальбом' } },
    { path: '/study', name: 'study', component: Study, meta: { title: 'Учеба' } },
    { path: '/test', name: 'test', component: Test, meta: { title: 'Тест' } },
  ]
})

router.beforeEach((to) => {
  const { title } = to.meta;
  const defaultTitle = 'Персональный сайт';

  document.title = title + ' - ' + defaultTitle || defaultTitle
})

export default router
