<template>
    <div flex items-center justify-between gap-1 px-4 pt-4>
        <button btn btn-default btn-circle type="button" @click="handleLast">
            <icon-caret-left-filled size="1.25rem"></icon-caret-left-filled>
        </button>
        <time :datetime="date">{{ date }}</time>
        <button btn btn-default btn-circle type="button" @click="handleNext">
            <icon-caret-right-filled size="1.25rem"></icon-caret-right-filled>
        </button>
    </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { computed } from 'vue';
import { IconCaretLeftFilled, IconCaretRightFilled } from '@tabler/icons-vue';
import { useDateStore } from '@/store';

const { timestamp, last, next, updateDate } = useDateStore();
const date = computed(() => dayjs(timestamp.value).format('YYYY-MM-DD'));

const handleLast = () => {
    updateDate(last.value);
};
const handleNext = () => {
    updateDate(next.value);
};
</script>
