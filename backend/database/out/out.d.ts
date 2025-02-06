import type { IEvent } from '../event/event';

export interface IOutModel {
    // 详情
    goods: number;
    // 标签
    tag: number | null;
    // 活动
    event: number;
    // 数量
    quantity: number;
    // 金额
    amount: number | null;
    // 规格
    specs: string | null;
    // 备注
    remark: string | null;
}

export type TOutItem = Pick<IOutModel, 'goods' | 'quantity'> &
    Partial<Pick<IOutModel, 'tag' | 'amount' | 'specs' | 'remark'>>;

export type IOut = IEvent & { items: TOutItem[] };
