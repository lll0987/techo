<template>
    <drawer :show="show" @update:show="updateShow">
        <drawer-header></drawer-header>
        <div card flex flex-col gap-4 p-4 mx-3 mt-4>
            <div flex items-center justify-between gap-4>
                <h3 text-4.5 font-600>睡眠</h3>
                <button btn btn-default btn-circle type="button" @click="handleAddSleep">
                    <icon-plus size="1.25rem" />
                </button>
            </div>
            <time-range
                v-for="item in sleep_list"
                :key="item.id"
                v-model:start="item.start"
                v-model:end="item.end"
            ></time-range>
        </div>
        <div card flex flex-col gap-4 p-4 mx-3 mt-4>
            <div flex items-center justify-between gap-4>
                <h3 text-4.5 font-600>起床</h3>
                <button btn btn-default btn-circle type="button" @click="handleAddBed">
                    <icon-plus size="1.25rem" />
                </button>
            </div>
            <time-range
                v-for="item in bed_list"
                :key="item.id"
                v-model:start="item.start"
                v-model:end="item.end"
            ></time-range>
        </div>
        <div flex justify-end items-center gap-2 p-4>
            <button class="btn btn-medium btn-primary" @click="handleConfirm">提交</button>
        </div>
    </drawer>
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import { IconPlus } from '@tabler/icons-vue';
import { Drawer, TimeRange, useAlert } from '@/components';
import { DrawerHeader } from '@/components/drawer';
import type { IEvent } from '@/contracts';
import { dailyTopic } from '@/store';
import { useEventApi } from '@/api';
import { SleepStoreKey } from '..';

const {
    getSleepEvents,
    getBedEvents,
    editing,
    sleep_list,
    handleAddSleep,
    handleValidateSleep,
    bed_list,
    handleAddBed,
    handleValidateBed
} = inject(SleepStoreKey)!;
const grain = 0b01;

const show = ref(false);
const updateShow = (value?: boolean) => {
    show.value = !!value;
    if (!value) editing.value = !!value;
};
watch(editing, val => {
    show.value = !!val;
});

const alert = useAlert();
const { batchWrite } = useEventApi();
const handleConfirm = async () => {
    // 校验 sleep 表单
    sleep_list.value = sleep_list.value.filter(i => i.start || i.end);
    const msg1 = handleValidateSleep();
    if (msg1) {
        alert.error(msg1);
        return;
    }
    bed_list.value = bed_list.value.filter(i => i.start || i.end);
    // 设置 bed 默认值
    if (bed_list.value.length === 1 && !bed_list.value[0].start) {
        const { end } = bed_list.value[0];
        let start = end;
        if (sleep_list.value.length) {
            start = Math.max(...sleep_list.value.filter(i => i.end! < end!).map(i => i.end!));
        }
        bed_list.value[0].start = start;
    }
    // 校验 bed 表单
    const msg2 = handleValidateBed();
    if (msg2) {
        alert.error(msg2);
        return;
    }
    // 提交数据
    const sleep_events = sleep_list.value.map(i => ({ ...i, grain, topic: dailyTopic.sleep, tags: [] })) as IEvent[];
    const bed_events = bed_list.value.map(i => ({ ...i, grain, topic: dailyTopic.bed, tags: [] })) as IEvent[];
    // TODO 更新
    const [msg] = await batchWrite([...sleep_events, ...bed_events]);
    if (msg) {
        alert.error(msg);
        return;
    }
    getSleepEvents();
    getBedEvents();
    // updateShow(false);
    alert.success('保存成功');
};
</script>
