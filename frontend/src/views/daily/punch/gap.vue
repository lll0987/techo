<template>
    <li>
        <div class="flex justify-between items-center">
            <label class="checkbox-label" :class="isChecked ? 'decoration-line-through' : ''">
                <input type="checkbox" class="checkbox checkbox-primary" :checked="isChecked" @change="onChange" />
                {{ title }}
            </label>
            <span v-if="repeat">{{ gap }} / {{ repeat }}</span>
            <span v-else>{{ gap }}天前</span>
        </div>
    </li>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import dayjs from 'dayjs';
import type { IPunchModel, TRecord } from '@/contracts';
import { usePunchApi } from '@/api';
import { useDateStore } from '@/store';
import { useAlert } from '@/components';

const props = defineProps<{ title: string; repeat?: number }>();
const { title, repeat } = toRefs(props);

const { create, remove, getMaxByTitle } = usePunchApi();
const { timestamp, subscribe } = useDateStore();

const items = ref<TRecord<IPunchModel>[]>([]);
const getList = async () => {
    const [, data] = await getMaxByTitle({ title: title.value, date: timestamp.value });
    items.value = data || [];
};

const isChecked = computed(() => items.value.some(i => i.date === timestamp.value));
const gap = computed(() => {
    const item = items.value.find(i => i.date < timestamp.value);
    return item ? dayjs(timestamp.value).diff(dayjs(item.date), 'day') : '?';
});

const alert = useAlert();
const onChange = async (e: Event) => {
    const dom = e.target as HTMLInputElement;
    const item = items.value.find(i => i.date === timestamp.value);
    if (!item && !dom.checked) {
        alert.error(`${title.value}未找到相关记录`);
        getList();
        return;
    }
    const fn = dom.checked ? create({ title: title.value, date: timestamp.value }) : remove(item!.id!);
    const [msg] = await fn;
    if (msg) alert.error(msg);
    getList();
};

subscribe(() => {
    getList();
});
</script>
