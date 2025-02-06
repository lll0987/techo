import { computed, ref } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import type { IEventModel, TRecord } from '@/contracts';
import { h24, useDateStore } from '@/store';
import { useEventApi } from '@/api/event';
import type { SleepForm } from '.';

dayjs.extend(duration);

const h12 = h24 / 2;

const isOverlap = (t1: SleepForm, t2: SleepForm) => {
    return t1.start! < t2.end! && t2.start! < t1.end!;
};

export const useSleepValue = (topic: number, filter = true) => {
    const { timestamp, next, subscribe } = useDateStore();
    const { list } = useEventApi();

    const events = ref<TRecord<IEventModel>[]>([]);
    const length = computed(() => {
        const l = events.value.reduce((r, i) => (r += i.end - i.start), 0);
        if (!l) return ['?', '?'];
        const d = dayjs.duration(l);
        return [d.hours(), d.minutes()];
    });
    const time = computed(() => {
        if (!events.value.length) return '-';
        const arr = filter ? events.value.filter(i => i.start - timestamp.value < h12) : events.value;
        const s = Math.min(...arr.map(i => i.start));
        const e = Math.max(...arr.map(i => i.end));
        return `${dayjs(s).format('HH:mm')} ~ ${dayjs(e).format('HH:mm')}`;
    });
    const getEvents = async () => {
        const [, data] = await list({ topic, end: { gte: timestamp.value, lte: next.value } });
        events.value = data;
    };

    const form_list = ref<SleepForm[]>([]);
    const handleEdit = () => {
        form_list.value = events.value?.length
            ? events.value.map(({ start, end, id }) => ({ start, end, id }))
            : [{ start: null, end: null }];
    };
    const handleAdd = () => {
        form_list.value.push({ start: null, end: null });
    };
    const handleValidate = () => {
        if (form_list.value.some(i => !i.start || !i.end)) return '开始时间、结束时间都不能为空';
        const i1 = form_list.value.findIndex(i => i.start! > i.end!);
        if (i1 !== -1) return `第${i1 + 1}行结束时间早于开始时间`;
        for (let i = 0; i < form_list.value.length; i++) {
            for (let j = i + 1; j < form_list.value.length; j++) {
                if (isOverlap(form_list.value[i], form_list.value[j])) {
                    return `第${i + 1}行与第${j + 1}行时间重叠`;
                }
            }
        }
        return '';
    };

    subscribe(async () => {
        await getEvents();
        handleEdit();
    });

    return { length, time, getEvents, form_list, handleEdit, handleAdd, handleValidate };
};
