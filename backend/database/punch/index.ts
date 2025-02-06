import type { IPunchModel } from './punch';

export const fields: Array<keyof IPunchModel> = ['title', 'date'];

export * from './punch.controller';
export * from './punch.service';
export * from './punch.schema';
