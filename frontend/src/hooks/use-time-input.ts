import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';
import { useDateStore } from '@/store';
import type { Ref } from 'vue';
import type { TEventGrain } from '@/contracts';

export const useTimeInput = (grain?: Ref<TEventGrain>) => {
    const { timestamp } = useDateStore();

    const isTime = computed(() => !grain || grain.value < 0b10);
    const getTimeValue = (str: string) => {
        const [hour, minute] = str.split(':');
        const h = Number(hour);
        const m = Number(minute);
        return dayjs(timestamp.value).hour(h).minute(m).valueOf();
    };
    const getDateValue = (str: string) => {
        const [year, month, day] = str.split('-');
        const y = Number(year);
        const m = Number(month);
        const d = Number(day);
        return dayjs(timestamp.value)
            .year(y)
            .month(m - 1)
            .date(d)
            .valueOf();
    };

    // input value
    const inputValue = ref<string>('');
    const updateStr = (value: number | null) => {
        inputValue.value = value ? dayjs(value).format(isTime.value ? 'HH:mm' : 'YYYY-MM-DD') : '';
    };
    // inputValue -> value
    const value = ref<number | null>(null);
    const updateValue = (str: string) => {
        if (str) {
            value.value = isTime.value ? getTimeValue(str) : getDateValue(str);
        } else {
            value.value = null;
        }
    };
    // value -> inputValue
    watch(
        value,
        val => {
            updateStr(val);
        },
        { immediate: true }
    );
    // input onInput
    const onInput = (e: InputEvent | Event) => {
        const targetValue = (e.target as HTMLInputElement).value;
        updateValue(targetValue);
        updateStr(value.value);
    };

    return { inputValue, value, onInput };
};
