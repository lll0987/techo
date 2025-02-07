<template>
    <section card p-3 flex flex-col gap-2>
        <label class="input-field">
            <span font-600>体重</span>
            <input
                type="text"
                class="input"
                :value="weight"
                @input="inputWeight"
                @blur="blurWeight"
                @keydown="keydownWeight"
            />
            <span>斤</span>
        </label>
        <label class="input-field">
            <span font-600>步数</span>
            <input type="text" class="input" :value="step" @input="inputStep" @blur="blurStep" @keydown="keydownStep" />
        </label>
    </section>
</template>

<script setup lang="ts">
import { dailyTopic } from '@/store';
import { useHealthValue } from './useHealthValue';

const {
    inputValue: weight,
    onBlur: blurWeight,
    onInput: inputWeight,
    onKeydown: keydownWeight
} = useHealthValue(dailyTopic.weight);

const {
    inputValue: step,
    onBlur: blurStep,
    onInput: inputStep,
    onKeydown: keydownStep
} = useHealthValue(dailyTopic.step);
</script>
