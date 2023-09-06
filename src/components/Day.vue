<script setup>
    
    const props = defineProps(["temp", "date", "pic", "wind", "rain"]);

</script>

<template>
    <article class="day" aria-label="День">
        <p class="day__date">{{date}}</p>
        <p class="day__temp">Температура, &#8451;</p>
        <p class="day__wind">Ветер, м/с</p>
        <p class="day__rain">Осадки</p>
        <img class="day__pic" alt="Погода" :src="pic" />
        <p class="day__temp-value">{{ Math.round(temp) }}</p>
        <p class="day__wind-value">{{ wind }}</p>
        <p class="dat__rain-value">{{ rain }}</p>
    </article>
</template>

<style scoped>
    .day {
        width: 100%;
        background-color: #e2e2e2;
        height: 160px;
        margin-bottom: 14px;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(2, 1fr);
        font-size: 20px;
        justify-items: center;
        align-items: center;
        border-radius: 9px;
        text-align: center;
    }
    
</style>