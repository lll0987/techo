import { TCompare } from './database';

// 比较符号
export const COMPARE: Record<TCompare, string> = {
    lt: '<',
    gt: '>',
    lte: '<=',
    gte: '>='
};

// 数据库表名
export type TableName =
    | 'event'
    | 'topic'
    | 'tag'
    | 'event_tag'
    | 'checklist'
    | 'punch'
    | 'goods'
    | 'goods_tag'
    | 'into_item'
    | 'out_item';

export * from './useController';
export * from './useService';
export * from './schema';
