import type { IInto, IIntoModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useIntoApi = () => {
    const create = async (data: IIntoModel) => {
        const result = (await request.POST('/into/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: IIntoModel[]) => {
        const result = (await request.POST('/into/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<IIntoModel>) => {
        const result = (await request.PUT(`/into/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/into/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: Partial<TRecord<IIntoModel>>, sort?: TRecordSort<IIntoModel>) => {
        const result = (await request.POST('/into/list', { filter, sort })) as [TMessage, TRecord<IIntoModel>[]];
        return result;
    };

    const createIntoEvent = async (data: IInto) => {
        const result = (await request.POST('/into/createIntoEvent', data)) as [TMessage, number[]];
        return result;
    };

    return { create, batchCreate, update, remove, list, createIntoEvent };
};
