import type { ITagModel } from './tag';

export const fields: Array<keyof ITagModel> = ['name', 'color', 'sub_color', 'alias'];

export * from './tag.controller';
export * from './tag.service';
export * from './tag.schema';
