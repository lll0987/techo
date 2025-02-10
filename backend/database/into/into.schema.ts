import { z } from 'zod';
import { getSortSchema, idSchema } from '../base';
import { goodsSchema } from '../goods';
import { eventSchema } from '../event';
import { fields } from '.';
import type { IIntoModel } from './into';

const number = z.number().positive();
const specs = z.string().nullable();
const remark = z.string().nullable();

export const intoSchema = z.object({
    goods: idSchema,
    tag: idSchema.nullable(),
    event: idSchema,
    qty: number,
    amount: number,
    price: number,
    unit_qty: number,
    unit_price: number,
    specs,
    remark
});

export const intoSortSchema = getSortSchema<IIntoModel>(fields);

export const intoEventSchema = eventSchema.extend({
    items: z
        .object({
            qty: number,
            amount: number,
            unit_qty: number,
            goods: z.union([idSchema, goodsSchema]),
            tag: idSchema.nullable().optional(),
            specs: specs.optional(),
            remark: remark.optional()
        })
        .array()
});
