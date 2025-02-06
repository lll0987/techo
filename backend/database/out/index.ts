import { IOutModel } from './out';

export const fields: Array<keyof IOutModel> = ['goods', 'tag', 'event', 'quantity', 'amount', 'specs', 'remark'];

export * from './out.controller';
export * from './out.service';
export * from './out.schema';
