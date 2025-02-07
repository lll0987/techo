<template>
    <section card flex justify-between px-3 py-2>
        <p font-600>第{{ days }}天</p>
        <label class="checkbox-label">
            <input type="checkbox" class="checkbox checkbox-primary" :checked="isChecked" @change="updateValue" />
            <span v-if="flag">已结束</span>
            <span v-else>新开始</span>
        </label>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import type { IEventModel, TRecord } from '@/contracts';
import { dailyTopic, useDateStore } from '@/store';
import { useEventApi } from '@/api/event';
import { useAlert } from '@/components';

const length = 518400000;

const { timestamp, subscribe } = useDateStore();
const { getMaxByTopic, create, update } = useEventApi();

const event = ref<TRecord<IEventModel>>();
const getEvent = async () => {
    const [, data] = await getMaxByTopic({ topic: dailyTopic.period, start: { lte: timestamp.value } });
    event.value = data;
};

const flag = computed(() => {
    // 没有相关记录
    if (!event.value) return false;
    // 第一天
    if (timestamp.value === event.value.start) return false;
    const d = Number(days.value);
    // 无法获取天数
    if (isNaN(d)) return false;
    // 14天以上
    if (d > 14) return false;
    // 不存在结束日期
    if (!event.value.end) return true;
    // 在结束日期前
    if (timestamp.value <= event.value.end) return true;
    // 默认值
    return false;
});
const isChecked = computed(() => timestamp.value === event.value?.start || timestamp.value === event.value?.end);
const days = computed(() => {
    if (!event.value?.id) return ' ? ';
    return dayjs(timestamp.value).diff(event.value.start, 'day') + 1;
});

subscribe(() => {
    getEvent();
});

const alert = useAlert();
const updateValue = async (e: Event) => {
    const dom = e.target as HTMLInputElement;
    if (!dom.checked) return;
    const result = flag.value
        ? update(event.value!.id!, { end: timestamp.value })
        : create({
              topic: dailyTopic.period,
              start: timestamp.value,
              end: timestamp.value + length,
              grain: 0b11,
              tags: []
          });
    const [msg] = await result;
    if (msg) return alert.error(msg);
    getEvent();
};
</script>
