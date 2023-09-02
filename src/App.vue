<script setup>
  import Weather from './components/Weather.vue';
</script>

<template>
  <header class="header">
    <section class="search" aria-label="Выбор города">
      <form class="city-form">
        <img class="city-form__search-icon city-form__search-icon_gray" alt="Поиск" src="./assets/search-icon.svg"/>
        <input class="city-form__input" placeholder="Город" />
        <button class="city-form__submit" type="submit">
          <img class="city-form__search-icon_white" src="./assets/search-icon_white.svg" alt="Поиск"/>
        </button>
      </form>
    </section>
  </header>
  <main class="main">
    <Weather/>
  </main>
</template>

<style scoped>

  .header {
    display: flex;
    justify-content: center;
  }
  .search {
    display: flex;
    margin-top: 50px;
    background-color: #ECEEF2;
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

  .city-form__search-icon_gray {
    margin-left: 25px;
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
    justify-content: center;
  }

</style>
