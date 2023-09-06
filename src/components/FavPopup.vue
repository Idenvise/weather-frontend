<script setup>
  const props = defineProps(["favCities", "openFavCities", "closePopupFav", "favCitiesRemove","showHistoryWeather"])
</script>

<template>
  <section class="profile__fav-city" v-bind:class="[openFavCities ? 'visible' : '']" v-on:click.self="closePopupFav">
    <div class="profile__fav-city-container popup">
      <div class="popup__header">
        <h2 class="popup__title">Избранные города</h2>
        <button class="popup__close" type="button" v-on:click="closePopupFav"></button>
      </div>
      <div class="popup__main">
        <div class="popup__cities-wrapper" v-for="(city, index) in favCities" :key="index">
          <button type="button" class="popup__fav-city" v-on:click="[showHistoryWeather(city), closePopupFav()]" >{{ city }}</button>
          <button class="popup__fav-city-delete" type="button" v-on:click="favCitiesRemove(index)"></button>
          </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  .popup__fav-city-delete {
    border: none;
    background-color: transparent;
    background-image: url('../assets/cross.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .popup__cities-wrapper {
    display: flex;
    justify-content: space-between;
    margin: 7px 0;
  }
  .popup__main {
    display: flex;
    flex-direction: column;
    margin: 15px auto 0;
    width: 40%;
  }
  .popup__fav-city {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .popup__header {
    display: flex;
    justify-content: space-between;
  }
  .popup__title {
    margin: 0 0 0 10px;
  }
  .popup__close {
    background-image: url('../assets/cross.png');
    background-color: transparent;
    background-size: contain;
    border: none;
    margin: 10px 10px 0 0;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  .profile__fav-city-container {
    width: 40%;
    height: 400px;
    background-color: white;
    border-radius: 9px;
  }
  .profile__fav-city {
    z-index: 1;
    justify-content: center;
    align-items: center;
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    background-color: #0000009f;
  }
  .visible {
    display: flex;
  }
</style>