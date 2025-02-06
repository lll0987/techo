import { z } from 'zod';
import { colorSchema, getSortSchema } from '../base';
import { fields } from '.';
import type { ITagModel } from './tag';

export const tagSchema = z.object({
    name: z.string(),
    color: colorSchema,
    sub_color: colorSchema.nullable(),
    alias: z.string().nullable()
});

export const tagSortSchema = getSortSchema<ITagModel>(fields);
