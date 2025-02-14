import dayjs from 'dayjs';
import { ref, watch } from 'vue';
import { useEventApi } from '@/api';
import { useChartStore } from './use-chart-store';
import type { IEventModel, TRecord } from '@/contracts';

type Arr = TRecord<IEventModel>[];

export type TChartLabel = [string, string];

export interface IChartData {
    span: number;
    events: Arr;
    label?: TChartLabel;
    time?: number;
}

class ChartMap {
    private map: Map<number, { events: Arr; label?: TChartLabel }>;
    private ks: number[];

    constructor() {
        this.map = new Map<number, { events: Arr; label?: TChartLabel }>();
        this.ks = [];
    }

    set(key: number, value: { event?: TRecord<IEventModel>; label?: TChartLabel }) {
        if (this.map.has(key)) {
            const { events, label } = this.map.get(key)!;
            if (value.event) events.push(value.event);
            this.map.set(key, { events, label: value.label || label });
        } else {
            this.map.set(key, { events: value.event ? [value.event] : [], label: value.label });
            this.ks.push(key);
        }
    }

    get(key: number) {
        return this.map.get(key);
    }

    sort() {
        this.ks.sort((a, b) => a - b);
    }

    keys() {
        return this.ks;
    }

    values() {
        return this.ks.map(key => this.map.get(key)!);
    }

    forEach(fn: (key: number, item: { events: Arr; label?: TChartLabel }, index: number) => void) {
        this.ks.forEach((key, index) => {
            fn(key, this.map.get(key)!, index);
        });
    }
}

const getIntersection = (arr1: Arr, arr2: Arr) => {
    const set = new Set(arr2.map(i => i.id));
    return arr1.filter(i => set.has(i.id));
};

export const useChartData = () => {
    const { rows, date_start, date_end } = useChartStore();

    const events = ref<Arr>([]);
    const { list } = useEventApi();
    const getEvents = async () => {
        const [, data] = await list({
            grain: 1,
            start: { gte: date_start.value, lte: date_end.value },
            end: { gte: date_start.value, lte: date_end.value }
        });
        events.value = data;
        handleCells();
    };

    watch(date_end, () => {
        getEvents();
    });

    const cells = ref<IChartData[]>([]);
    const handleCells = () => {
        const map = new ChartMap();
        // 添加所有日期
        let current = date_start.value;
        while (current <= date_end.value) {
            const d = dayjs(current);
            map.set(current, { label: [d.format('DD'), d.format('dd')] });
            current = dayjs(current).add(1, 'day').valueOf();
        }
        // 添加所有事件
        for (const item of events.value) {
            map.set(item.start, { event: item });
            map.set(item.end, { event: item });
        }
        // 排序
        map.sort();

        let cache: Arr = [];
        const arr: IChartData[] = [];
        const times = map.keys();
        for (let index = 1; index < times.length; index++) {
            const start = map.get(times[index - 1])!;
            const end = map.get(times[index])!;
            // 列头
            if (start.label) arr.push({ span: 1, label: start.label, events: [], time: times[index - 1] });
            // 取交集
            const events = getIntersection(start.events, end.events);
            // 计算跨越行数
            const shour = dayjs(times[index - 1]).hour();
            let ehour = dayjs(times[index]).hour();
            if (ehour < shour || (!ehour && ehour === shour)) ehour += rows;
            const span = ehour - shour;
            // 小于一行的数据暂存，然后放入下一行
            if (span > 0) {
                arr.push({ span, events: [...cache, ...events] });
                cache = [];
            } else {
                cache.push(...events);
            }
        }
        cells.value = arr;
    };

    return { cells, getEvents };
};
