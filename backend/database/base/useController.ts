import { db } from '..';
import { COMPARE, TableName } from '.';
import type { TCompare, TRecord, TRecordSort } from './database';

// select 条件
export const conditional = (fields: string[], filter?: Record<string, any>, table = '') => {
    let sql = '';
    let where = 'WHERE';
    const params: Record<string, any> = {};
    for (const field of fields) {
        if (!filter?.[field]) continue;
        const value = filter[field];
        if (typeof value === 'object') {
            if (Array.isArray(value)) {
                // 多选查询
                const v = value.map(v => (typeof v === 'string' ? `'${v}'` : v)).join(', ');
                sql += ` ${where} ${table}${field} IN (${v})`;
                where = 'AND';
            } else {
                // 比较查询
                const v = value as Record<TCompare, any>;
                const ks = Object.keys(filter[field]) as TCompare[];
                ks.forEach((k, i) => {
                    const ki = `${field}${i}`;
                    sql += ` ${where} ${table}${field} ${COMPARE[k]} :${ki}`;
                    where = 'AND';
                    params[ki] = v[k];
                });
            }
        } else {
            // 匹配查询
            sql += ` ${where} ${table}${field} = :${field}`;
            where = 'AND';
            params[field] = value;
        }
    }
    return { sql, params };
};

// 排序
export const order_by = (fields: string[], sort?: TRecordSort<any>, table = '') => {
    let sql = '';
    let order = ' ORDER BY';
    for (const field of fields) {
        if (!sort?.[field]) continue;
        sql += `${order} ${table}${field} ${sort[field]}`;
        order = ',';
    }
    return sql;
};

// 插入
export const insert = (table: TableName, fields: string[]) => {
    return `INSERT INTO ${table} (` + fields.join(', ') + ') VALUES (' + fields.map(f => `:${f}`).join(', ') + ')';
};

// 修改
export const update_by_id = (table: TableName, fields: string[], data: Record<string, any>) => {
    const cols = fields.filter(f => data[f] !== undefined);
    return `UPDATE ${table} SET ` + cols.map(f => `${f} = :${f}`).join(', ') + ' WHERE id = :id';
};

// 删除
export const delete_by_id = (table: TableName) => {
    return `DELETE FROM ${table} WHERE id = :id`;
};

export const useController = <T>(table: TableName, fields: Array<keyof T>) => {
    // 查
    const list = (filter?: Partial<TRecord<T>>, sort?: TRecordSort<T>) => {
        let _sql = `SELECT * FROM ${table}`;
        const { sql, params } = conditional(fields as string[], filter);
        if (sql) _sql += sql;
        const order = order_by(fields as string[], sort);
        if (order) _sql += order;
        const records = db.prepare(_sql).all(params) as TRecord<T>[];
        return records;
    };
    // 增
    const create = (data: T) => {
        const sql = insert(table, fields as string[]);
        const id = db.prepare(sql).run(data).lastInsertRowid as number;
        return id;
    };
    const batchCreate = (data: T[]) => {
        const sql = insert(table, fields as string[]);
        const stmt = db.prepare(sql);
        const ids = data.map(i => stmt.run(i).lastInsertRowid as number);
        return ids;
    };
    // 改
    const update = (id: number, data: Partial<T>) => {
        const sql = update_by_id(table, fields as string[], data);
        const result = db.prepare(sql).run({ id, ...data }).changes === 1;
        return result;
    };
    // 删
    const remove = (id: number) => {
        const sql = delete_by_id(table);
        const result = db.prepare(sql).run({ id }).changes === 1;
        return result;
    };

    return { list, create, batchCreate, update, remove };
};

export type TController<T> = ReturnType<typeof useController<T>>;
