import {defineStore} from "pinia";
import {ref} from "vue";

export const useVisitsStore = defineStore('visitsStore', () => {
    const visitsInLocaleStorage = ref([
        { 'name': 'Главная', 'route': 'pageVisits-home', 'count': 0 },
        { 'name': 'Обо мне', 'route': 'pageVisits-about', 'count': 0 },
        { 'name': 'Мои интересы', 'route': 'pageVisits-interests', 'count': 0 },
        { 'name': 'Учеба', 'route': 'pageVisits-study', 'count': 0 },
        { 'name': 'Фотографии', 'route': 'pageVisits-photo', 'count': 0 },
        { 'name': 'Контакты', 'route': 'pageVisits-contacts', 'count': 0 },
        { 'name': 'Тест', 'route': 'pageVisits-test', 'count': 0 },
        { 'name': 'История', 'route': 'pageVisits-history', 'count': 0 },
    ]);

    const visitsInCookie = ref([
        { 'name': 'Главная', 'route': 'pageVisits-home', 'count': 0 },
        { 'name': 'Обо мне', 'route': 'pageVisits-about', 'count': 0 },
        { 'name': 'Мои интересы', 'route': 'pageVisits-interests', 'count': 0 },
        { 'name': 'Учеба', 'route': 'pageVisits-study', 'count': 0 },
        { 'name': 'Фотографии', 'route': 'pageVisits-photo', 'count': 0 },
        { 'name': 'Контакты', 'route': 'pageVisits-contacts', 'count': 0 },
        { 'name': 'Тест', 'route': 'pageVisits-test', 'count': 0 },
        { 'name': 'История', 'route': 'pageVisits-history', 'count': 0 },
    ]);

    const getVisits = (route) => {
        incrementVisits(route);
        const foundItem = visitsInLocaleStorage.value.find(item => item.route === route);
        if (foundItem) {
            foundItem.count++;
            const index = visitsInLocaleStorage.value.findIndex(item => item.route === route);
            visitsInLocaleStorage.value[index].count = foundItem.count;
        }
    }

    const setCookie = (name, value, expiration_days) => {
        const date = new Date();
        date.setTime(date.getTime() + (expiration_days * 24 * 60 * 60 * 1000));
        const expires = ref('expires=' + date.toUTCString());
        document.cookie = `${name}=${value}; ${expires.value}; path=/`;
    }

    const getCookie = (routeName) => {
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split('; ');

        for (let cookie of cookieArray) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === routeName) {

                const foundItem = visitsInCookie.value.find(item => item.route === routeName);
                if (foundItem) {
                    const index = visitsInCookie.value.findIndex(item => item.route === routeName);
                    visitsInCookie.value[index].count = cookieValue;
                }

                return cookieValue;
            }
        }

        return null;
    }

    const incrementVisits = (route) => {
        let visits = parseInt(getCookie(route)) || 0;
        visits++;
        setCookie(route, visits, 365);
    }

    const initializeVisitsFromCookies = () => {
        visitsInCookie.value.forEach(item => {
            item.count = parseInt(getCookie(item.route)) || 0;
        });
    }

    initializeVisitsFromCookies();

    return {
        visitsInLocaleStorage,
        visitsInCookie,
        getVisits,
        setCookie,
        getCookie,
        incrementVisits,
    }
})