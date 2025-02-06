import { fields } from '.';
import { useController } from '../base';
import type { IGoodsModel, IGoodsTagModel, TGoods } from './goods';

const data2row = (data: TGoods) =>
    ({
        name: data.name,
        code: data.code,
        remark: data.remark || null,
        total: null,
        quantity: null,
        min: data.min || null
    } as IGoodsModel);

const controller = useController<IGoodsModel>('goods', fields);
export const useGoodsController = () => {
    const create = (data: TGoods) => {
        return controller.create(data2row(data));
    };
    const batchCreate = (data: TGoods[]) => {
        return controller.batchCreate(data.map(data2row));
    };
    const update = controller.update;
    const remove = controller.remove;
    const list = controller.list;

    return { create, batchCreate, update, remove, list };
};

export const useGoodsTagController = () => {
    return useController<IGoodsTagModel>('goods_tag', ['goods_id', 'tag_id']);
};
