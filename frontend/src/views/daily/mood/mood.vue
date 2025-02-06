<template>
    <section flex items-center justify-evenly>
        <span
            v-for="i in max"
            :key="i"
            :class="i <= mood ? 'text-warning' : 'text-neutral-content'"
            @click.stop="updateMoodValue(i)"
        >
            <icon-mood-smile-filled size="2rem" />
        </span>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconMoodSmileFilled } from '@tabler/icons-vue';
import type { IEventModel, TRecord } from '@/contracts';
import { useDateStore } from '@/store';
import { useEventApi } from '@/api/event';
import { useAlert } from '@/components';

const topic = ref(3);
const max = ref(5);

const { timestamp, subscribe } = useDateStore();
const { list, create, update } = useEventApi();

const mood = ref(0);
const event = ref<TRecord<IEventModel>>();
const getEvent = async () => {
    const [, data] = await list({ start: timestamp.value, topic: topic.value });
    event.value = data[0];
    mood.value = data[0]?.value || 0;
};

const alert = useAlert();
const updateMoodValue = async (i: number) => {
    const result = event.value?.id
        ? update(event.value.id, { value: i })
        : create({
              value: i,
              topic: topic.value,
              start: timestamp.value,
              end: timestamp.value,
              grain: 0b10,
              tags: []
          });
    const [msg] = await result;
    if (msg) return alert.error(msg);
    getEvent();
};

subscribe(() => {
    getEvent();
});
</script>
