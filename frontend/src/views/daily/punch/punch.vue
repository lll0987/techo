<template>
    <section card p-4>
        <ul>
            <frequency v-for="title in arr_frequency" :title="title" class="punch-item"></frequency>
            <gap v-for="title in arr_gap" :title="title" class="punch-item"></gap>
            <gap v-for="item in arr_repeat" :title="item.title" :repeat="item.repeat" class="punch-item"></gap>
        </ul>
    </section>
</template>

<script setup lang="ts">
import Frequency from './frequency.vue';
import Gap from './gap.vue';

const arr_frequency = [];
const arr_gap = [];
const arr_repeat = [];
</script>
