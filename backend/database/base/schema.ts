import { z } from 'zod';

// 排序
export const sortTypeSchema = z.enum(['ASC', 'DESC'] as const);
export const getSortSchema = <T>(fields: Array<keyof T>) => {
    return z.object(
        fields.reduce((r, n) => ({ ...r, [n]: sortTypeSchema.optional() }), { id: sortTypeSchema.optional() })
    );
};

// 比较符号
export const compareSchema = z.enum(['lt', 'gt', 'lte', 'gte'] as const);

// id
export const idSchema = z.number().int().positive();
// 时间戳
export const timestampSchema = z.number().int().positive();
// 颜色
export const colorSchema = z.string();
