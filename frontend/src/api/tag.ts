import type { ITagModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useTagApi = () => {
    const create = async (data: ITagModel) => {
        const result = (await request.POST('/tag/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: ITagModel[]) => {
        const result = (await request.POST('/tag/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<ITagModel>) => {
        const result = (await request.PUT(`/tag/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/tag/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: Partial<TRecord<ITagModel>>, sort?: TRecordSort<ITagModel>) => {
        const result = (await request.POST('/tag/list', { filter, sort })) as [TMessage, TRecord<ITagModel>[]];
        return result;
    };

    return { create, batchCreate, update, remove, list };
};
