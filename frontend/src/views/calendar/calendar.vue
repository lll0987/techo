<template>
    <article>
        <header>
            <time :datetime="datetime">
                <p text-6 font-600>{{ month }}</p>
                <p text-3.5>{{ year }}</p>
            </time>
        </header>
        <section>
            <div flex gap-1 my-2>
                <button btn btn-default btn-circle type="button" @click="handleLastYear">
                    <icon-chevrons-left size="1.25rem" />
                </button>
                <button btn btn-default btn-circle type="button" @click="handleLastMonth">
                    <icon-chevron-left size="1.25rem" />
                </button>
                <div flex-1 flex justify-center items-center text-3.5>{{ month_cn }}</div>
                <button btn btn-default btn-circle type="button" @click="handleNextMonth">
                    <icon-chevron-right size="1.25rem" />
                </button>
                <button btn btn-default btn-circle type="button" @click="handleNextYear">
                    <icon-chevrons-right size="1.25rem" />
                </button>
            </div>
            <div grid justify-between cols="[repeat(7,_1.5rem)]" text-3.5 leading-6 text-center>
                <span v-for="i in weekdays" :key="i">{{ i }}</span>
                <div v-if="beforedays" :style="{ gridColumn: `span ${beforedays}` }"></div>
                <span
                    v-for="i in days"
                    :key="i"
                    :class="
                        selected && selectdate === i
                            ? ['bg-primary', 'text-primary-content', 'font-600']
                            : 'hover:bg-[rgba(28,_28,_41,_0.07)]'
                    "
                    class="cursor-default rounded-2 transition-colors"
                    @click="handleUpdate(i)"
                >
                    {{ i }}
                </span>
            </div>
        </section>
    </article>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight } from '@tabler/icons-vue';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import localeData from 'dayjs/plugin/localeData';
dayjs.extend(localeData);

import { useDateStore } from '@/store';

const instanceLocaleData = dayjs().locale('zh-cn').localeData();
const weekdays = instanceLocaleData.weekdaysMin();

const { timestamp, updateDate, subscribe } = useDateStore();

const day = ref(timestamp.value);
const updateValue = (timestamp: number) => {
    day.value = timestamp;
};

const beforedays = computed(() => dayjs(day.value).date(1).day());
const days = computed(() => dayjs(day.value).daysInMonth());
const selected = computed(() => dayjs(timestamp.value).isSame(day.value, 'day'));
const selectdate = computed(() => dayjs(day.value).date());

const datetime = computed(() => dayjs(timestamp.value).format('YYYY/MM/DD'));
const month_cn = computed(() => dayjs(day.value).locale('zh-cn').format('MMMM'));
const month = computed(() => dayjs(day.value).format('MMMM'));
const year = computed(() => dayjs(day.value).format('YYYY'));

const handleLastMonth = () => {
    updateValue(dayjs(day.value).subtract(1, 'month').valueOf());
};
const handleNextMonth = () => {
    updateValue(dayjs(day.value).add(1, 'month').valueOf());
};
const handleLastYear = () => {
    updateValue(dayjs(day.value).subtract(1, 'year').valueOf());
};
const handleNextYear = () => {
    updateValue(dayjs(day.value).add(1, 'year').valueOf());
};

const handleUpdate = (date: number) => {
    const t = dayjs(day.value).date(date).valueOf();
    updateDate(t);
    updateValue(t);
};

subscribe(() => {
    updateValue(timestamp.value);
});
</script>
