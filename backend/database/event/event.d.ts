import { TCompare, TRecord } from '../base/database';

// ----------------------------------- 颗粒度 -----------------------------------
export type TEventGrain = 0b00 | 0b01 | 0b10 | 0b11;

// ----------------------------------- 数据模型 -----------------------------------
export interface IEventModel {
    // 开始日期时间
    start: number;
    // 结束日期时间
    end: number;
    // 颗粒度
    grain: TEventGrain;
    // 主题
    topic: number;
    // 值
    value: number | null;
    // 备注
    remark: string | null;
    // 描述
    title: string | null;
}
export interface IEventTagModel {
    event_id: number;
    tag_id: number;
}

// ----------------------------------- 数据类型 -----------------------------------
type TER = Pick<IEventModel, 'start' | 'end' | 'grain' | 'topic'>;
type TEP = Pick<IEventModel, 'value' | 'remark' | 'title'>;
export type TEvent = TER & Partial<TEP>;
export type IEvent = TEvent & { tags: number[] };

// ----------------------------------- 查询条件 -----------------------------------
type TEE = Pick<IEventModel, 'grain' | 'topic' | 'value' | 'remark' | 'title'>;
export type IEventFilter = Partial<TRecord<TEE>> & {
    start?: number | Partial<Record<TCompare, number>>;
    end?: number | Partial<Record<TCompare, number>>;
    tag?: number;
};
