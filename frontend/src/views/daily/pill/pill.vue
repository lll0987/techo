<template>
    <section card p-3>
        <div inline-flex mb-3>
            <input
                v-for="i in goods"
                type="radio"
                name="pill-radio"
                :checked="i.code === checked"
                :aria-label="i.name"
                :data-quantity="`${i.quantity}/${i.total}`"
                class="pill-item join-item btn btn-small btn-default checked:btn-positive inline-block"
            />
        </div>
        <p v-if="event?.id" text-5 flex gap-1>
            <span v-for="i in time">{{ i }}</span>
        </p>
        <p v-else flex gap-2>
            <label class="input-field input-label border-transparent" data-label="未服药">
                <input type="time" :value="start" class="input" @input="onInput" @keydown="onKeydown" />
            </label>
        </p>
    </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import type { IEventModel, IGoodsModel, TRecord } from '@/contracts';
import { useEventApi, useGoodsApi, useOutApi } from '@/api';
import { useDateStore } from '@/store';
import { useAlert } from '@/components';

const topic = ref(4);
const tag = ref(1);
const length = ref(43200000);
// NEXT 拿药
const unit = 15;

const { timestamp, next, subscribe } = useDateStore();
const { list: listE } = useEventApi();
const { list: listG } = useGoodsApi();
const { createOutEvent } = useOutApi();

const goods = ref<TRecord<IGoodsModel>[]>();
const checked = ref();
const getGoods = async () => {
    const [, data] = await listG({ tag: tag.value });
    goods.value = data;
    checked.value = data[0].code;
};
getGoods();

const event = ref<TRecord<IEventModel>>();
const time = computed(() => {
    if (!event.value?.start) return ['未服药'];
    return [dayjs(event.value.start).format('HH:mm'), '~', dayjs(event.value.end).format('HH:mm')];
});
const getEvent = async () => {
    const [, data] = await listE({
        topic: topic.value,
        tag: tag.value,
        start: { gte: timestamp.value, lte: next.value }
    });
    event.value = data[0];
};
subscribe(() => {
    getEvent();
});

const start = ref('');
const onInput = (e: InputEvent | Event) => {
    const targetValue = (e.target as HTMLInputElement).value;
    start.value = targetValue;
};
const onKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
        handleConfirm();
    }
};

const alert = useAlert();
const handleConfirm = async () => {
    if (!start.value) {
        alert.error('请输入服药时间');
        return;
    }
    const [hour, minute] = start.value.split(':');
    const h = Number(hour);
    const m = Number(minute);
    const s = dayjs(timestamp.value).hour(h).minute(m).valueOf();
    const e = s + length.value;
    const item = goods.value?.find(i => i.code === checked.value)!;
    const [msg] = await createOutEvent({
        start: s,
        end: e,
        topic: topic.value,
        tags: [tag.value],
        grain: 0b01,
        items: [{ goods: item.id, quantity: 1 }]
    });
    if (msg) {
        alert.error(msg);
        return;
    }
    alert.success('保存成功');
    start.value = '';
    getEvent();
};
</script>
