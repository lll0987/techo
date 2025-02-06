import type { IEvent, IEventFilter, IEventModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useEventApi = () => {
    const create = async (data: IEvent) => {
        const result = (await request.POST('/event/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: IEvent[]) => {
        const result = (await request.POST('/event/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<IEvent>) => {
        const result = (await request.PUT(`/event/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/event/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: IEventFilter, sort?: TRecordSort<IEventModel>) => {
        const result = (await request.POST('/event/list', { filter, sort })) as [TMessage, TRecord<IEventModel>[]];
        return result;
    };

    const getMaxByTopic = async (filter: { topic: number } & Pick<IEventFilter, 'start' | 'end'>) => {
        const result = (await request.POST('/event/getMaxEventByTopic', filter)) as [TMessage, TRecord<IEventModel>];
        return result;
    };

    const batchWrite = async (data: Array<{ id?: number } & IEvent>) => {
        const result = (await request.POST('/event/batchWrite', data)) as [TMessage, TRecord<IEventModel>[]];
        return result;
    };

    return { create, batchCreate, update, remove, list, getMaxByTopic, batchWrite };
};
