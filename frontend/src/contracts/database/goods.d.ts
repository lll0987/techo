import { TRecord } from './database';

export interface IGoodsModel {
    // 名称
    name: string;
    // 编码
    code: string;
    // 备注
    remark: string | null;
    // 总数
    total: number | null;
    // 数量
    quantity: number | null;
    // 预警值
    min: number | null;
}

export interface IGoodsTagModel {
    goods_id: number;
    tag_id: number;
}

export type TGoods = Pick<IGoodsModel, 'code' | 'name'> & Partial<Pick<IGoodsModel, 'remark' | 'min'>>;
export type IGoods = TGoods & { tags: number[] };

export type IGoodsFilter = Partial<TRecord<IGoodsModel>> & {
    tag?: number;
};
