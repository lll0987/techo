import { computed, ref } from 'vue';
import type { ITopicModel, TRecord } from '@/contracts';
import type { SelectItem } from '@/components/select';
import { useTopicApi } from '@/api/topic';
import { useAlert } from '@/components';

// TODO 改为存入数据库
export const dailyTopic: Record<string, number> = {
    sleep: 1,
    bed: 2,
    mood: 3,
    pill: 4,
    period: 5,
    weight: 6,
    step: 7
};

const topicList = ref<TRecord<ITopicModel>[]>([]);
const topicMap = computed(() =>
    topicList.value.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, TRecord<ITopicModel>>())
);
const topicOptions = computed<SelectItem[]>(() =>
    topicList.value
        .filter(i => !Object.values(dailyTopic).includes(i.id))
        .map(({ id, name }) => ({ label: name, value: String(id) }))
);

export const useTopicStore = () => {
    const getTopic = (id: number) => topicMap.value.get(id);

    const alert = useAlert();
    const { list } = useTopicApi();
    const refreshTopic = async () => {
        const [msg, data] = await list();
        if (msg) {
            alert.error(msg);
            return;
        }
        topicList.value = data;
    };

    return { topicList, topicMap, topicOptions, getTopic, refreshTopic };
};
