import { z } from 'zod';
import { idSchema } from '../base';

export const checklistModuleSchema = z.enum(['event', 'punch'] as const);

const cronSchema = z.string().min(1);

const title = z.string().min(1);
const active = z.nativeEnum({ true: 1, false: 0 } as const);

export const checklistSchema = z.object({
    title,
    topic: idSchema,
    tag: idSchema.nullable(),
    start: cronSchema,
    end: cronSchema,
    active,
    module: checklistModuleSchema
});
