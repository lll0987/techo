<template>
    <div :class="theme">
        <alert-provider>
            <main bg-base-100 text-base-content h-screen flex>
                <!-- 图表区 -->
                <div flex-1></div>
                <!-- 内容区 -->
                <div w-80 flex flex-col gap-3 py-1.5>
                    <Checklist />
                    <Punch />
                    <Bill />
                    <Trade />
                    <Event />
                    <Food />
                </div>
                <!-- 内容区 -->
                <div w-90 flex flex-col gap-3>
                    <div absolute top-4 right-0>
                        <button
                            type="button"
                            class="px-4 py-0.5 text-3.5 font-600 text-secondary-content bg-secondary rounded-l-full"
                            @click="handleToday"
                        >
                            Today
                        </button>
                    </div>
                    <div flex-1 flex flex-col gap-3 px-4>
                        <!-- 日历 -->
                        <Calendar />
                        <!-- 内容 -->
                        <Period />
                        <Mood />
                        <Sleep />
                        <Pill />
                        <Health />
                    </div>
                    <!-- 设置区 -->
                    <div ml-4>
                        <Config />
                    </div>
                </div>
            </main>
        </alert-provider>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useDateStore, useThemeStore } from '@/store';
import { AlertProvider } from '@/components';
import Calendar from '@/views/calendar';
import Config from '@/views/config';
import { Period, Mood, Sleep, Pill, Punch, Checklist, Bill, Trade, Event, Food, Health } from '@/views/daily';

const { theme } = useThemeStore();

const { updateDate } = useDateStore();
const handleToday = () => {
    updateDate(new Date().valueOf());
};
onMounted(() => {
    handleToday();
});
</script>
