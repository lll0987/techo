<template>
    <p flex items-center gap-2>
        <label input-field>
            <span
                badge
                cursor-pointer
                :class="offset === -1 ? 'badge-accent' : 'badge-soft'"
                @click.stop="updateOffset(-1)"
            >
                -1
            </span>
            <input input type="time" :value="startStr" @input="startInput" />
        </label>
        <span>至</span>
        <label input-field>
            <span
                badge
                cursor-pointer
                :class="offset === 1 ? 'badge-accent' : 'badge-soft'"
                @click.stop="updateOffset(1)"
            >
                +1
            </span>
            <input input type="time" :value="endStr" @input="endInput" />
        </label>
    </p>
</template>

<script setup lang="ts">
import type { ModelRef, PropType } from 'vue';
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import { useDateStore } from '@/store';

const start = defineModel('start', { type: [Number, null] as PropType<number | null>, default: null });
const end = defineModel('end', { type: [Number, null] as PropType<number | null>, default: null });

type TOffset = -1 | 0 | 1;
const offset = ref<TOffset>(0);
const updateOffset = (value: TOffset) => {
    const abs = Math.abs(offset.value - value);
    // +1 -1 直接切换，先重置为当天的值
    if (abs === 2) {
        offset.value = 0;
        startChange();
        endChange();
    }
    // 取消选中时置为默认值
    offset.value = abs ? value : 0;
    if (offset.value >= 0) endChange();
    if (offset.value <= 0) startChange();
};

const { timestamp, next } = useDateStore();

const useTimeValue = (model: ModelRef<number | null>) => {
    // input value
    const str = ref<string>('');
    const updateStr = (value: number | null) => {
        str.value = value ? dayjs(value).format('HH:mm') : '';
    };
    // str -> model
    const updateModel = (s: string) => {
        if (s) {
            const [hour, minute] = s.split(':');
            const h = Number(hour);
            const m = Number(minute);
            model.value = dayjs(timestamp.value).add(offset.value, 'day').hour(h).minute(m).valueOf();
        } else {
            model.value = null;
        }
    };
    // input onInput
    const onInput = (e: InputEvent | Event) => {
        const targetValue = (e.target as HTMLInputElement).value;
        updateModel(targetValue);
        updateStr(model.value);
    };
    // badge onClick
    const change = () => {
        if (!str.value) return;
        updateModel(str.value);
    };
    // model -> str
    watch(
        model,
        value => {
            if (value && value < timestamp.value) offset.value = -1;
            if (value && value >= next.value) offset.value = 1;
            updateStr(value);
        },
        { immediate: true }
    );

    return { str, onInput, change };
};

const { str: startStr, onInput: startInput, change: startChange } = useTimeValue(start);

const { str: endStr, onInput: endInput, change: endChange } = useTimeValue(end);
</script>
