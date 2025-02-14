import { computed, ref } from 'vue';
import { useDateStore } from '@/store';

import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import weekday from 'dayjs/plugin/weekday';
dayjs.extend(weekday);

const time_length = 24;
const time_scales = [24, 12, 6, 3] as const;

const def_col_width = 48;
const def_col_height = 50;
const def_row_width = 60;
const def_row_height = 30;

// 时间轴
const time_start = ref(0);
const time_end = computed(() => (time_start.value || time_length) - 1);
// 日期轴
const { timestamp } = useDateStore();
const date_end = computed(() => dayjs(timestamp.value).locale('zh-cn').weekday(7).valueOf());
const date_start = computed(() => dayjs(date_end.value).subtract(cols.value, 'day').valueOf());

// 容器
const container = ref({ width: 0, height: 0 });

// 列数量
const cols = computed(() => {
    const { width } = container.value;
    if (!width) return 1;
    return Math.floor((width - def_row_width) / def_col_width);
});

// 行数量
const rows = time_length;
// 行标签
const row_scale = computed(() => {
    const { height } = container.value;
    return time_scales.find(i => height - def_col_height > i * def_row_height) || time_scales[0];
});
const row_span = computed(() => rows / row_scale.value);
const isFirstHour = (hour: number) => (hour * row_scale.value) % rows === 0;
const row_labels = computed(() => {
    const labels = [];
    for (let i = 0; i < time_length; i++) {
        if (time_start.value) i += time_start.value;
        if (i >= time_length) i -= time_length;
        const label = i < 10 ? `0${i}:00` : `${i}:00`;
        if (isFirstHour(i)) labels.push(label);
    }
    return labels;
});

//
const styles = computed(() => ({
    'grid-template-columns': `repeat(${cols.value}, minmax(0, 1fr)) ${def_row_width}px`,
    'grid-template-rows': `${def_col_height}px repeat(${rows}, minmax(0, 1fr))`
}));

export const useChartStore = () => {
    return {
        container,
        styles,
        cols,
        rows,
        row_span,
        row_labels,
        date_start,
        date_end,
        time_start,
        time_end
    };
};
