<script setup>
    import { ref } from 'vue';

    const days = ref(0);
    const city = ref('Здесь будет ваш город');
    
    function setDays(n) {
        days.value = n;
    }
</script>

<template>
    <section class="weather" aria-label="Погода">
        <div class="weather__city-wrapper">
            <h1 class="weather__city">{{city}}</h1>
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
        background-color: #ECEEF2;
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