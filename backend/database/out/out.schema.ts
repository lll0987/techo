import { z } from 'zod';
import { getSortSchema, idSchema } from '../base';
import { fields } from '.';
import type { IOutModel } from './out';
import { eventSchema } from '../event';

const quantity = z.number().positive();
const amount = z.number().positive();
const specs = z.string().nullable();
const remark = z.string().nullable();

export const outSchema = z.object({
    goods: idSchema,
    tag: idSchema.nullable(),
    event: idSchema,
    quantity,
    amount: amount.nullable(),
    specs,
    remark
});

export const outSortSchema = getSortSchema<IOutModel>(fields);

export const outEventSchema = eventSchema.extend({
    items: z
        .object({
            goods: idSchema,
            quantity,
            tag: idSchema.optional(),
            amount: amount.optional(),
            specs: specs.optional(),
            remark: remark.optional()
        })
        .array()
});
