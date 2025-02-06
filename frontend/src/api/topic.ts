import type { ITopicModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useTopicApi = () => {
    const create = async (data: ITopicModel) => {
        const result = (await request.POST('/topic/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: ITopicModel[]) => {
        const result = (await request.POST('/topic/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<ITopicModel>) => {
        const result = (await request.PUT(`/topic/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/topic/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: Partial<TRecord<ITopicModel>>, sort?: TRecordSort<ITopicModel>) => {
        const result = (await request.POST('/topic/list', { filter, sort })) as [TMessage, TRecord<ITopicModel>[]];
        return result;
    };

    return { create, batchCreate, update, remove, list };
};
