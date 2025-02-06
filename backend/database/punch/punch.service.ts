import { db } from '..';
import { useService } from '../base';
import type { TRecord } from '../base/database';
import type { IPunchModel } from './punch';
import { usePunchController } from './punch.controller';

const controller = usePunchController();

const h24 = 24 * 60 * 60 * 1000;

export const usePunchService = () => {
    const getMaxByTitle = (filter: IPunchModel & { limit?: number }) => {
        const { title, date, limit } = filter;
        return db.transaction(() => {
            if (!limit) {
                const sql = 'SELECT * FROM punch WHERE title = ? AND date <= ? ORDER BY date DESC LIMIT 2';
                const data = db.prepare(sql).all(title, date) as TRecord<IPunchModel>[];
                return !data.length || data[0].date === date ? data : [data[0]];
            } else {
                const start = date - (limit - 1) * h24;
                const sql = 'SELECT * FROM punch WHERE title = ? AND date >= ? AND date <= ? ORDER BY date ASC';
                return db.prepare(sql).all(title, start, date) as TRecord<IPunchModel>[];
            }
        })();
    };

    return { ...useService(controller), getMaxByTitle };
};
