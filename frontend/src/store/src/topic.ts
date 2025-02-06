import { computed, ref } from 'vue';
import type { ITopicModel, TRecord } from '@/contracts';
import type { SelectItem } from '@/components/select';
import { useTopicApi } from '@/api/topic';
import { useAlert } from '@/components';

const topicList = ref<TRecord<ITopicModel>[]>([]);
const topicMap = computed(() =>
    topicList.value.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, TRecord<ITopicModel>>())
);
const topicOptions = computed<SelectItem[]>(() =>
    topicList.value.map(({ id, name }) => ({ label: name, value: String(id) }))
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
