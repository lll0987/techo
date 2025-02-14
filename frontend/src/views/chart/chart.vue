<template>
    <section ref="chartEl" class="grid grid-flow-col" :style="styles">
        <div v-for="item in cells" class="chart-cell" :style="{ 'grid-row': `span ${item.span}` }">
            <div
                v-if="item.label"
                class="chart-col-cell"
                :class="isChecked(item.time) ? ['bg-primary', 'text-primary-content'] : ''"
            >
                <p :class="isChecked(item.time) ? 'font-600' : ''">{{ item.label[0] }}</p>
                <p text-3 text-neutral-content>{{ item.label[1] }}</p>
            </div>
            <div
                v-for="event in item.events"
                class="chart-bar"
                :class="getBarClass(event)"
                :style="getBarStyle(event, item.span)"
            ></div>
        </div>
        <div class="chart-corner"></div>
        <div v-for="label in row_labels" class="chart-row-cell" :style="{ 'grid-row': `span ${row_span}` }">
            <span>{{ label }}</span>
        </div>
    </section>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { ref } from 'vue';
import { useResizeObserver, useThrottleFn } from '@vueuse/core';
import type { IEventModel, TRecord } from '@/contracts';
import { useDateStore, useTopicStore } from '@/store';
import { useChartStore } from './use-chart-store';
import { useChartData } from './use-chart-data';

const { cells, getEvents } = useChartData();

const chartEl = ref<HTMLElement | null>(null);
const { container, styles, row_labels, row_span } = useChartStore();

useResizeObserver(
    chartEl,
    useThrottleFn(entries => {
        const { width, height } = entries[0].contentRect;
        container.value.width = width;
        container.value.height = height;
        getEvents();
    }, 300)
);

const { topicMap } = useTopicStore();
const getBarClass = (event: TRecord<IEventModel>) => {
    const { color } = topicMap.value.get(event.topic)!;
    return `chart-${color}`;
};

const getBarStyle = (event: TRecord<IEventModel>, span: number) => {
    const total = 60 * span;
    const { start, end } = event;
    const minute = dayjs(start).minute();
    const top = Math.floor((minute / total) * 10000) / 100;
    const h = dayjs(end).diff(start, 'minute');
    const height = Math.floor((h / total) * 10000) / 100;
    return { top: `${top}%`, height: `${height}%` };
};

const { timestamp } = useDateStore();
const isChecked = (time?: number) => {
    return timestamp.value === time;
};
</script>
