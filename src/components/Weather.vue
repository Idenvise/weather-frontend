<script setup>
  import { ref, watch } from 'vue';
  import Day from './Day.vue'
  
  const props = defineProps(['weather', 'cityName'])
  const days = ref(5);

  function setDays(n) {
      days.value = n;
  }
</script>

<template>
    <section class="weather" aria-label="Погода">
        <div class="weather__city-wrapper">
            <h1 class="weather__city">{{cityName ? cityName  : 'Здесь будет ваш город'}}</h1>
            <button 
                v-on:click=setDays(5) 
                type="button" 
                class="weather__5days weather__days-button" 
                v-bind:class="[days === 5 ? 'active' : '']">
                5 дней
            </button>
            <button 
                v-on:click=setDays(10) 
                type="button" 
                class="weather__10days weather__days-button" 
                v-bind:class="[days === 10 ? 'active' : '']">
                10 дней
            </button>
        </div>
        <Day 
            v-for="(day, index) in weather" 
            :key="index" 
            :temp="day.main.temp" 
            :date="day.dt_txt" 
            :pic="day.weather[0].icon" 
            :wind="day.wind.speed"
            :rain="day.weather[0].description"
        />
    </section>
</template>

<style scoped>

    .weather {
        width: 40%;
    }

    .weather__city-wrapper {
        display: flex;
        align-items: center;
    }

    .weather__city {
        margin-right: auto;
    }

    .weather__days-button {
        background-color: #e2e2e2;
        border: transparent;
        border-radius: 20px;
        height: 40px;
        width: 80px;
        cursor: pointer;
        transition: all .5s ease-in-out;
    }
    .weather__days-button:hover {
        border: 1px solid black;
    }

    .weather__days-button:first-of-type {
        margin-right: 30px;
    }

    .active {
        color: white;
        background-color: black;
    }

</style>