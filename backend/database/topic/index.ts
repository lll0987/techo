import { ITopicModel } from './topic';

export const fields: Array<keyof ITopicModel> = ['name', 'color'];

export * from './topic.controller';
export * from './topic.service';
export * from './topic.schema';
