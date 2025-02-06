// 基础数据类型
export interface IModel {
    id: number;
}
export type TRecord<T> = T & IModel;

// 排序
export type TSort = 'ASC' | 'DESC';
export type TRecordSort<T> = { [key in keyof TRecord<T>]?: TSort };

// 比较符号
export type TCompare = 'lt' | 'gt' | 'lte' | 'gte';
