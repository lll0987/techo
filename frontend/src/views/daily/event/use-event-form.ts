import { ref, type InjectionKey } from 'vue';
import type { IEvent, TEventGrain } from '@/contracts';
import { useAlert } from '@/components';
import { useNumberInput, useTimeInput } from '@/hooks';
import { useDateStore } from '@/store';

const grains = ['时间', '时间范围', '日期', '日期范围'];

export const useEventForm = () => {
    // 颗粒度
    const grain = ref<TEventGrain>(0);
    const updateGrain = (index: number) => {
        grain.value = index as TEventGrain;
    };
    // 时间范围
    const { value: start, inputValue: startStr, onInput: onStartInput } = useTimeInput(grain);
    const { value: end, inputValue: endStr, onInput: onEndInput } = useTimeInput(grain);
    // 主题
    const topic = ref('');
    // 标签
    const tag = ref<string[]>([]);
    // 数值
    const { inputValue: value, onInput: onValueInput, onBlur: onValueBlur } = useNumberInput();
    // 标题
    const title = ref('');
    // 备注
    const remark = ref('');

    const alert = useAlert();
    const { timestamp } = useDateStore();
    const getEventModel = () => {
        if (grain.value === 0b00) end.value = start.value;
        if (grain.value === 0b10) end.value = start.value = timestamp.value;
        if (grain.value === 0b11) start.value = timestamp.value;
        if (!start.value || !end.value) {
            alert.error('请选择时间');
            return;
        }
        if (start.value > end.value) {
            alert.error('开始时间不能大于结束时间');
            return;
        }
        if (!topic.value) {
            alert.error('请选择主题');
            return;
        }
        return {
            start: start.value,
            end: end.value,
            grain: grain.value,
            topic: Number(topic.value),
            tags: tag.value.map(i => Number(i)),
            value: Number(value.value),
            title: title.value,
            remark: remark.value
        } as IEvent;
    };

    const reset = () => {
        grain.value = 0;
        start.value = end.value = null;
        topic.value = '';
        tag.value = [];
        value.value = '';
        title.value = '';
        remark.value = '';
    };

    return {
        grains,
        grain,
        updateGrain,
        start,
        startStr,
        onStartInput,
        end,
        endStr,
        onEndInput,
        topic,
        tag,
        value,
        onValueInput,
        onValueBlur,
        title,
        remark,
        getEventModel,
        reset
    };
};

type EventForm = Omit<ReturnType<typeof useEventForm>, 'getEventModel' | 'reset'>;
export const EventFormDataKey: InjectionKey<EventForm> = Symbol('event-form-data');
