import { TGoods } from './goods';

export const fields: Array<keyof TGoods> = ['name', 'code', 'remark', 'min'];

export * from './goods.controller';
export * from './goods.service';
export * from './goods.schema';
