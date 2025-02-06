import type { IEventModel, TEventGrain } from './event';

// ----------------------------------- 颗粒度 -----------------------------------
type KEventGrain = 'TIME' | 'TIME_RANGE' | 'DATE' | 'DATE_RANGE';
export const EVENT_GRAIN: Record<KEventGrain, TEventGrain> = {
    TIME: 0b00,
    TIME_RANGE: 0b01,
    DATE: 0b10,
    DATE_RANGE: 0b11
};

// ----------------------------------- 字段 -----------------------------------
export const fields: Array<keyof IEventModel> = ['start', 'end', 'grain', 'topic', 'value', 'remark', 'title'];

export * from './event.controller';
export * from './event.service';
export * from './event.schema';
