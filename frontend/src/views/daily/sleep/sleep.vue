<template>
    <section card card-editable py-4 flex items-center justify-center data-edit="编辑" @click.stop="handleEdit">
        <div grid cols-2 gap-x-2 gap-y-0.5>
            <p>
                <span text-4xl>{{ sleep_length[0] }}</span>
                hours
            </p>
            <p>
                <span text-4xl>{{ sleep_length[1] }}</span>
                minutes
            </p>
            <p col-span-2 secondary-text>{{ sleep_time }}</p>
            <p mt-4>
                <span text-4xl>{{ bed_length[0] }}</span>
                hours
            </p>
            <p mt-4>
                <span text-4xl>{{ bed_length[1] }}</span>
                minutes
            </p>
            <p col-span-2 secondary-text>{{ bed_time }}</p>
        </div>
        <drawer></drawer>
    </section>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { dailyTopic } from '@/store';
import Drawer from './drawer';
import { useSleepValue } from './useSleepValue';
import { SleepStoreKey } from '.';

const editing = ref(false);

// 睡眠
const {
    length: sleep_length,
    time: sleep_time,
    getEvents: getSleepEvents,
    form_list: sleep_list,
    handleAdd: handleAddSleep,
    handleEdit: handleEditSleep,
    handleValidate: handleValidateSleep
} = useSleepValue(dailyTopic.sleep);

// 躺着
const {
    length: bed_length,
    time: bed_time,
    getEvents: getBedEvents,
    form_list: bed_list,
    handleAdd: handleAddBed,
    handleEdit: handleEditBed,
    handleValidate: handleValidateBed
} = useSleepValue(dailyTopic.bed, false);

// 编辑
const handleEdit = () => {
    editing.value = true;
    handleEditSleep();
    handleEditBed();
};

provide(SleepStoreKey, {
    getSleepEvents,
    getBedEvents,
    editing,
    sleep_list,
    handleAddSleep,
    handleValidateSleep,
    bed_list,
    handleAddBed,
    handleValidateBed
});
</script>
