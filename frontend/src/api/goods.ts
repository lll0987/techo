import type { IGoods, IGoodsFilter, IGoodsModel, TMessage, TRecord, TRecordSort } from '@/contracts';
import { useRequest } from '@/hooks';

const request = useRequest();

export const useGoodsApi = () => {
    const create = async (data: IGoods) => {
        const result = (await request.POST('/goods/create', data)) as [TMessage, number];
        return result;
    };

    const batchCreate = async (data: IGoods[]) => {
        const result = (await request.POST('/goods/batchCreate', data)) as [TMessage, number[]];
        return result;
    };

    const update = async (id: number, data: Partial<IGoods>) => {
        const result = (await request.PUT(`/goods/update/${id}`, data)) as [TMessage, boolean];
        return result;
    };

    const remove = async (id: number) => {
        const result = (await request.DELETE(`/goods/remove/${id}`)) as [TMessage, boolean];
        return result;
    };

    const list = async (filter?: IGoodsFilter, sort?: TRecordSort<IGoodsModel>) => {
        const result = (await request.POST('/goods/list', { filter, sort })) as [TMessage, TRecord<IGoodsModel>[]];
        return result;
    };

    return { create, batchCreate, update, remove, list };
};
