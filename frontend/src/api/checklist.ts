import type { IChecklistModel, TMessage, TRecord } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useChecklistApi = () => {
    const create = async (data: IChecklistModel) => {
        const result = (await request.POST('/checklist/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: IChecklistModel[]) => {
        const result = (await request.POST('/checklist/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<IChecklistModel>) => {
        const result = (await request.PUT(`/checklist/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/checklist/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async () => {
        const result = (await request.POST('/checklist/list')) as [TMessage, TRecord<IChecklistModel>[]];
        return result;
    };

    return { create, batchCreate, update, remove, list };
};
