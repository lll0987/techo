import type { IPunchModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const usePunchApi = () => {
    const create = async (data: IPunchModel) => {
        const result = (await request.POST('/punch/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: IPunchModel[]) => {
        const result = (await request.POST('/punch/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<IPunchModel>) => {
        const result = (await request.PUT(`/punch/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/punch/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: Partial<TRecord<IPunchModel>>, sort?: TRecordSort<IPunchModel>) => {
        const result = (await request.POST('/punch/list', { filter, sort })) as [TMessage, TRecord<IPunchModel>[]];
        return result;
    };

    const getMaxByTitle = async (filter: IPunchModel & { limit?: number }) => {
        const result = (await request.POST('/punch/getMaxByTitle', filter)) as [TMessage, TRecord<IPunchModel>[]];
        return result;
    };

    return { create, batchCreate, update, remove, list, getMaxByTitle };
};
