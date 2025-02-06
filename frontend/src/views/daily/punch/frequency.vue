<template>
    <li>
        <div class="flex justify-between mb-2">
            <div
                v-for="i in boxs"
                class="border-primary border rounded-1 w-4 h-4"
                :class="i ? 'bg-primary' : 'bg-primary-content'"
            ></div>
        </div>
        <label class="checkbox-label" :class="isChecked ? 'decoration-line-through' : ''">
            <input type="checkbox" class="checkbox checkbox-primary" :checked="isChecked" @change="onChange" />
            {{ title }}
        </label>
    </li>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import dayjs from 'dayjs';
import type { IPunchModel, TRecord } from '@/contracts';
import { usePunchApi } from '@/api';
import { useDateStore } from '@/store';
import { useAlert } from '@/components';

const total = 14;

const props = defineProps<{ title: string }>();
const { title } = toRefs(props);

const { create, remove, getMaxByTitle } = usePunchApi();
const { timestamp, subscribe } = useDateStore();

const items = ref<TRecord<IPunchModel>[]>([]);
const getList = async () => {
    const [, data] = await getMaxByTitle({ title: title.value, date: timestamp.value, limit: total });
    items.value = data || [];
};

const isChecked = computed(() => items.value.some(i => i.date === timestamp.value));
const boxs = computed(() => {
    const arr = [];
    for (let i = 0; i < total; i++) {
        const d = dayjs(timestamp.value).subtract(i, 'day').valueOf();
        const item = items.value.find(i => i.date === d);
        arr.unshift(!!item);
    }
    return arr;
});

const alert = useAlert();
const onChange = async (e: Event) => {
    const dom = e.target as HTMLInputElement;
    const fn = dom.checked ? create({ title: title.value, date: timestamp.value }) : remove(1);
    const [msg] = await fn;
    if (msg) alert.error(msg);
    getList();
};

subscribe(() => {
    getList();
});
</script>
