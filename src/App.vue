<script setup>
  import { ref, watch } from 'vue';
  import Weather from './components/weather.vue';
  import { mainApi } from './utils/weatherApi';
  import { authApi } from './utils/authApi'
  import HistorySearch from './components/HistorySearch.vue';
  import FavPopup from './components/FavPopup.vue'
  import Singin from './components/Signin.vue'
  import Signup from './components/Signup.vue'

  const city = ref('');
  const requestedCity = ref('');
  const coordinates = ref({});
  const weather = ref({});
  const showWeather = ref({});
  const searchFocused = ref(false);
  const searchHistory = ref([]);
  const loggedIn = ref(false);
  const favCities = ref([]);
  const openFavCities = ref(false);
  const openSignin = ref(false);
  const openSignup = ref(false);
  const userData = ref({});
  const reqCounter =ref(0);
  const months = {
    "01": "января",
    "02": "февраля",
    "03": "марта",
    "04": "апреля",
    "05": "мая",
    "06": "июнь",
    "07": "июля",
    "08": "августа",
    "09": "сентября",
    "10": "октября",
    "11": "ноября",
    "12": "декабря",
  }
  reqCounter.value = JSON.parse(localStorage.getItem('counter'));
  localStorage.getItem('token') !== null 
  && 
  authApi.tokenCheck()
    .then(() => {
      loggedIn.value = true;
      userData.value = JSON.parse(localStorage.getItem('user'));
    })
   
  JSON.parse(localStorage.getItem("history")) &&  (searchHistory.value = JSON.parse(localStorage.getItem("history")));
  JSON.parse(localStorage.getItem("fav")) &&  (favCities.value = JSON.parse(localStorage.getItem("fav")));

  watch(coordinates, (newValue) => {
    mainApi._getWeather(newValue.lat, newValue.lon)
      .then(res => weather.value = res)
      .catch(err => console.log(err))
  })

  watch(loggedIn, (newValue) => {
    if (newValue) {
      reqCounter.value = 0 
    };
  })

  watch(weather, (newValue) => {
    let arr = newValue.list.slice(0, 1).concat(newValue.list.slice(1).filter((n) => n.dt_txt.includes('12:00:00')));
    arr.length > 5 && arr.splice(1,1);
    arr.forEach((day) => {
      day.weather[0].icon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
      day.dt_txt = day.dt_txt.slice(8,10) + ' ' + months[day.dt_txt.slice(5,7)];
    });
    showWeather.value = arr;
  })
  
  function recordCity(e) {
    city.value = e.target.value;
  }
  
  function onSubmit(e) {
    e.preventDefault();
    getCityСoordinates()
  }

  function getCityСoordinates() {
    loginCheck() &&
    mainApi.getCityСoordinates(city.value)
      .then(res => {
        requestedCity.value = res[0].local_names.ru;
        coordinates.value = {lat: res[0].lat, lon: res[0].lon};
        saveHistory();
      })
      .catch(err => console.log(err));
  }

  function loginCheck() {
    if (loggedIn.value === false && (localStorage.getItem('date') === null || (localStorage.getItem('date')+10000000 < Date.now()))) {
      localStorage.setItem('date', Date.now())
    }
    if (loggedIn.value) {
      reqCounter.value = 0;
    } else {
      reqCounter.value = reqCounter.value + 1;
    }
    if (localStorage.getItem('date')+10000000 < Date.now()) {
      localStorage.setItem('date', Date.now())
      reqCounter.value = 0;
    }
    localStorage.setItem('counter', reqCounter.value)
    if (reqCounter.value > 14) {
      return false;
    } else {
      return true;
    }
  }

  function saveHistory() {
    if (requestedCity.value != undefined) {
      searchHistory.value.includes(requestedCity.value) || searchHistory.value.unshift(requestedCity.value);
    }
    if (searchHistory.value.length > 5 ) {
      searchHistory.value.splice(5,1);
    }
    searchHistory.value && localStorage.setItem('history', JSON.stringify(searchHistory.value))
  }

  function onSearchFocus() {
    searchFocused.value = !searchFocused.value;
  }

  function removeHist() {
    localStorage.removeItem("history");
    searchHistory.value = [];
  }

  function showHistoryWeather(cityName) {
    city.value = cityName;
    getCityСoordinates();
  }

  function addFav() {
    mainApi.getCityСoordinates(city.value)
      .then(res => {
        favCities.value.includes(res[0].local_names.ru) || favCities.value.unshift(res[0].local_names.ru);
        favCities.value.length > 10 && favCities.value.splice(10, 1);
        localStorage.setItem('fav', JSON.stringify(favCities.value));
      })
      .catch(err => console.log(err))
  }
  function favCitiesRemove(i) {
    favCities.value.splice(i ,1)
    localStorage.setItem('fav', JSON.stringify(favCities.value));
  }

  

  function openPopupFav() {
    openFavCities.value = true;
  }
  function closePopupFav() {
    openFavCities.value = false;
  }
  function openPopupSignin() {
    openSignin.value = true;
  }
  function closePopupSignin() {
    openSignin.value = false;
  }
  function openPopupSignup() {
    openSignup.value = true;
  }
  function closePopupSignup() {
    openSignup.value = false;
  }

  function setUserData(email, password) {
    userData.value = {
      email: email,
      password: password
    };
  }
  function setLoggedInTrue() {
    loggedIn.value = true;
  }

  function logOut() {
    localStorage.clear();
    userData.value = {};
    loggedIn.value = false;
    searchHistory.value = [];
    favCities.value = [];
  }
  
</script>

<template>
  
  <header class="header">
    <FavPopup 
      :favCities="favCities" 
      :openFavCities="openFavCities" 
      :closePopupFav="closePopupFav" 
      :favCitiesRemove="favCitiesRemove" 
      :showHistoryWeather="showHistoryWeather"
    />
    <Singin :setUserData="setUserData" :openSignin="openSignin" :closePopupSignin="closePopupSignin" :setLoggedInTrue="setLoggedInTrue"/>
    <Signup :setUserData="setUserData" :openSignup="openSignup" :closePopupSignup="closePopupSignup" :setLoggedInTrue="setLoggedInTrue"/>
    <div class="profile">
      <button class="profile__burger" v-on:click="openPopupFav" ></button>    
      <p v-if="loggedIn" class="profile__email">{{ userData.email }}</p>
      <button type="button" v-if="loggedIn" class="profile__logout button" v-on:click="logOut">Выйти</button>
      <button type="button" v-if="!loggedIn" class="profile__signup button" v-on:click="openPopupSignup">Регистрация</button>
      <button type="button" v-if="!loggedIn" class="profile__signin button" v-on:click="openPopupSignin">Вход</button>
    </div>
    <section class="search" aria-label="Выбор города">
      <form class="city-form" @submit.prevent="onSubmit" v-on:focusin="onSearchFocus" v-on:focusout="onSearchFocus">
        <button class="city-form__search-icon city-form__fav" type="button" v-on:click="addFav"></button>
        <input class="city-form__input" placeholder="Город" v-on:change="recordCity"/>
        <button class="city-form__submit" type="submit">
          <img class="city-form__search-icon_white" src="./assets/search-icon_white.svg" alt="Поиск"/>
        </button>
      </form>
    </section>
  </header>
  <main class="main">
    <span class="search__limit" :class="[reqCounter > 14 ? 'visible' : '']">Достигнут лимит запросов. Зарегистрируйтесь или войдите, чтобы продолжить.</span>
    <div class="search__history" :class="[searchFocused && searchHistory.length != 0 ? 'search__history-visible' : '']">
      <HistorySearch v-for="(text, index) in searchHistory" class="search__history__ul" :key="index"  :text="text" :showHistoryWeather="showHistoryWeather"/>
      <button class="search__remove-hist" type="button" v-on:click="removeHist">Очистить историю</button>
    </div>
    <Weather :cityName="requestedCity" :weather="showWeather"/>
  </main>
</template>

<style scoped>
  .search__limit {
    color: red;
    display: none;
  }

  .visible {
    display: flex;
  }
  
  .profile {
    display: flex;
    width: 40%;
    margin-top: 15px;
  }
  .profile__burger {
    background-image: url('./assets/burger-menu.svg');
    background-size: 30px 30px;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    margin-right: auto;
    cursor: pointer;
  }
  .button {
    cursor: pointer;
    margin-left: 60px;
    border: none;
    background-color: transparent;
    border: 1px solid transparent;
    transition: .3 ease-in-out;
  }

  .button:hover {
    border-bottom: 1px solid black;
    transition: .3 ease-in-out;
  }

  .search__remove-hist {
    margin-left: 10px;   
    cursor: pointer;
    display: flex;
    background-color: transparent;
    border: none;
    transition: .3s ease-in-out;
    color: #d1d1d1;
  }
  .search__history {
    width: 40%;
    background-color: white;
    border: 1px solid black;
    position: absolute;
    display: flex;
    visibility: hidden;
    border-radius: 9px;
    flex-direction: column;
    font-size: 20px;
  }

  .search__history-visible {
    visibility: visible;
  }

  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .search {
    display: flex;
    margin-top: 15px;
    background-color: #e2e2e2;
    border-radius: 9px;
    height: 72px;
    align-items: center;
    justify-content: center;
    width: 40%;
  }

  .city-form {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .city-form__fav {
    margin-left: 25px;
    width: 40px;
    height: 40px;
    border: none;
    background-color: transparent;
    background-image: url('./assets/star.png');
    background-size: 24px;
    background-position: center;
    background-repeat: no-repeat;
    cursor: pointer;
  }

  .city-form__fav:hover {
    background-size: 30px;
  }

  .city-form__submit {
    width: 95px;
    padding: 0;
    margin: 0 25px 0 10px;
    height: 34px;
    border-radius: 48px;
    background-color: black;
    cursor: pointer;
  }

  .city-form__input {
    background-color: transparent;
    border: none;
    color: #A0A0A0;
    font-weight: 400;
    font-size: 18px;
    line-height: 20px;
    margin-left: 16px;
    outline: none;
    width: 100%;
  }

  .city-form__input::placeholder {
    color: #A0A0A0;
  }

  .main {
    display: flex;
    align-items: center;
    position: relative;
    flex-direction: column;
  }

</style>
