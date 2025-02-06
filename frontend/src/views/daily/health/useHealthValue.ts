import { ref } from 'vue';
import type { IEventModel, TRecord } from '@/contracts';
import { useEventApi } from '@/api';
import { useDateStore } from '@/store';
import { useNumberInput } from '@/hooks';
import { useAlert } from '@/components';

export const useHealthValue = (topic: number) => {
    const alert = useAlert();
    const { create, update, list } = useEventApi();
    const { timestamp, subscribe } = useDateStore();
    const { inputValue, onBlur, onInput } = useNumberInput();

    const event = ref<TRecord<IEventModel>>();
    const getEvent = async () => {
        const [, data] = await list({ topic, start: timestamp.value });
        event.value = data[0];
        inputValue.value = data[0]?.value ? String(data[0].value) : '';
    };

    const onKeydown = async (e: KeyboardEvent) => {
        if (e.key !== 'Enter') return;
        const value = inputValue.value ? Number(inputValue.value) : null;
        const fn = event.value?.id
            ? update(event.value.id, { value })
            : create({
                  topic,
                  value,
                  start: timestamp.value,
                  end: timestamp.value,
                  grain: 0b10,
                  tags: []
              });
        const [msg] = await fn;
        if (msg) {
            alert.error(msg);
            return;
        }
        getEvent();
    };

    subscribe(() => {
        getEvent();
    });

    return { inputValue, onInput, onBlur, onKeydown };
};
