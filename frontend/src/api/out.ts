import type { IOut, IOutModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useOutApi = () => {
    const create = async (data: IOutModel) => {
        const result = (await request.POST('/out/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: IOutModel[]) => {
        const result = (await request.POST('/out/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<IOutModel>) => {
        const result = (await request.PUT(`/out/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/out/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: Partial<TRecord<IOutModel>>, sort?: TRecordSort<IOutModel>) => {
        const result = (await request.POST('/out/list', { filter, sort })) as [TMessage, TRecord<IOutModel>[]];
        return result;
    };

    const createOutEvent = async (data: IOut) => {
        const result = (await request.POST('/out/createOutEvent', data)) as [TMessage, number[]];
        return result;
    };

    return { create, batchCreate, update, remove, list, createOutEvent };
};
