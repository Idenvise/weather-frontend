<script setup>
    const props = defineProps(["text","showHistoryWeather"]);

</script>

<template>
    <button type="button" class="hist" v-on:click="showHistoryWeather(text)">{{ text }}</button>
</template>

<style scoped>
    .hist {
        margin-left: 10px;   
        cursor: pointer;
        display: flex;
        background-color: transparent;
        border: none;
        transition: .3s ease-in-out;
    }
    .hist:hover {
        font-size: 15px;
    }
</style>