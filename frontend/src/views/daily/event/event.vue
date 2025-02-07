<template>
    <section>
        <button type="button" class="btn btn-medium btn-warning w-full" @click="show = true">日程</button>
        <drawer v-model:show="show">
            <drawer-header></drawer-header>
            <event-form></event-form>
            <div flex gap-4 px-4>
                <button type="button" class="btn btn-medium btn-primary" @click="onConfirm">提交</button>
            </div>
        </drawer>
    </section>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { Drawer, useAlert } from '@/components';
import { DrawerHeader } from '@/components/drawer';
import EventForm from './event-form.vue';
import { EventFormDataKey, useEventForm } from './use-event-form';
import { useEventApi } from '@/api';

const show = ref(false);
const { getEventModel, reset, ...data } = useEventForm();
provide(EventFormDataKey, data);

const alert = useAlert();
const { create } = useEventApi();
const onConfirm = async () => {
    const event = getEventModel();
    if (!event) return;
    const [msg] = await create(event);
    if (msg) return alert.error(msg);
    alert.success('保存成功');
    reset();
};
</script>
