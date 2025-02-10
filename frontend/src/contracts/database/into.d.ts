import { IEvent } from './event';
import { IGoods } from './goods';

export interface IIntoModel {
    // 详情
    goods: number;
    // 标签
    tag: number | null;
    // 活动
    event: number;
    // 数量
    qty: number;
    // 金额
    amount: number;
    // 单价
    price: number;
    // 单位数量
    unit_qty: number;
    // 单位价格
    unit_price: number;
    // 规格
    specs: string | null;
    // 备注
    remark: string | null;
}

export type TInItem = Pick<IIntoModel, 'amount' | 'qty' | 'unit_qty'> &
    Partial<Pick<IIntoModel, 'tag' | 'specs' | 'remark'>> & { goods?: number | IGoods };
export type IInto = IEvent & { items: TInItem[] };
