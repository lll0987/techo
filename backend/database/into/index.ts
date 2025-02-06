import { IIntoModel } from './into';

export const fields: Array<keyof IIntoModel> = [
    'goods',
    'tag',
    'event',
    'qty',
    'amount',
    'price',
    'unit_qty',
    'unit_price',
    'specs',
    'remark'
];

export * from './into.controller';
export * from './into.service';
export * from './into.schema';
