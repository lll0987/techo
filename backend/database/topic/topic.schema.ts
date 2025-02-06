import { z } from 'zod';
import { colorSchema, getSortSchema } from '../base';
import { fields } from '.';
import type { ITopicModel } from './topic';

export const topicSchema = z.object({ name: z.string(), color: colorSchema });

export const topicSortSchema = getSortSchema<ITopicModel>(fields);
