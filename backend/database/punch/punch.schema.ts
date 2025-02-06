import { z } from 'zod';
import { getSortSchema, timestampSchema } from '../base';
import { IPunchModel } from './punch';
import { fields } from '.';

const title = z.string().min(1);

export const punchSchema = z.object({ title, date: timestampSchema });

export const punchFilterSchema = z.object({
    title: title,
    date: timestampSchema,
    limit: z.number().int().positive().optional()
});

export const punchSortSchema = getSortSchema<IPunchModel>(fields);
