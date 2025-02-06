import { z } from 'zod';
import { getSortSchema, idSchema } from '../base';
import { fields } from '.';
import type { IGoodsModel } from './goods';

const name = z.string().min(1);
const code = z.string().min(1);
const remark = z.string();
const number = z.number().positive();

export const goodsSchema = z.object({
    name,
    code,
    remark: remark.nullable().optional(),
    min: number.nullable().optional(),
    tags: idSchema.array()
});

export const goodsFilterSchema = z.object({
    id: idSchema.optional(),
    name: name.optional(),
    code: code.optional(),
    remark: remark.optional(),
    total: number.optional(),
    quantity: number.optional(),
    min: number.optional(),
    tag: idSchema.optional()
});

export const goodsSortSchema = getSortSchema<IGoodsModel>(fields);
