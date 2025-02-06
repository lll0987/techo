import { z } from 'zod';
import { compareSchema, getSortSchema, idSchema, timestampSchema } from '../base';
import { EVENT_GRAIN, fields } from '.';
import type { IEventModel } from './event';

// ----------------------------------- 颗粒度 -----------------------------------
const grainSchema = z.nativeEnum(EVENT_GRAIN);

const value = z.number().optional();
const remark = z.string().optional();
const title = z.string().optional();

// ----------------------------------- 数据类型 -----------------------------------
export const eventSchema = z.object({
    start: timestampSchema,
    end: timestampSchema,
    grain: grainSchema,
    topic: idSchema,
    value,
    remark,
    title,
    tags: idSchema.array()
});
export const eventSchema2 = z.object({
    id: idSchema.optional(),
    start: timestampSchema,
    end: timestampSchema,
    grain: grainSchema,
    topic: idSchema,
    value,
    remark,
    title,
    tags: idSchema.array()
});

// ----------------------------------- 查询条件 -----------------------------------
export const eventDateFilterSchema = z.union([timestampSchema, z.record(compareSchema, timestampSchema)]);
export const eventFilterSchema = z.object({
    id: idSchema.optional(),
    start: eventDateFilterSchema.optional(),
    end: eventDateFilterSchema.optional(),
    grain: grainSchema.optional(),
    topic: idSchema.optional(),
    tag: idSchema.optional(),
    value,
    remark,
    title
});

// ----------------------------------- 排序 -----------------------------------
export const eventSortSchema = getSortSchema<IEventModel>(fields);
