import { computed, ref } from 'vue';
import type { ITagModel, TRecord } from '@/contracts';
import type { SelectItem } from '@/components/select';
import { useTagApi } from '@/api/tag';
import { useAlert } from '@/components';

// TODO 改为存入数据库
export const dailyTag: Record<string, number> = {
    pill: 1
};

const tagList = ref<TRecord<ITagModel>[]>([]);
const tagMap = computed(() =>
    tagList.value.reduce((acc, cur) => acc.set(cur.id, cur), new Map<number, TRecord<ITagModel>>())
);
const tagOptions = computed<SelectItem[]>(() =>
    tagList.value.map(({ id, name }) => ({ label: name, value: String(id) }))
);

export const useTagStore = () => {
    const getTag = (id: number) => tagMap.value.get(id);

    const alert = useAlert();
    const { list } = useTagApi();
    const refreshTag = async () => {
        const [msg, data] = await list();
        if (msg) {
            alert.error(msg);
            return;
        }
        tagList.value = data;
    };

    return { tagList, tagMap, tagOptions, getTag, refreshTag };
};
