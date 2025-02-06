import { parseExpression } from 'cron-parser';
import { db } from '..';
import { conditional, useService } from '../base';
import { fields as efields } from '../event';
import { fields as pfields } from '../punch';
import { useChecklistController } from './checklist.controller';
import type { IChecklistModel } from './checklist';
import type { TRecord } from '../base/database';

const controller = useChecklistController();

const getTime = ({ start, end }: { start: string; end: string }, currentDate: number = Date.now()) => {
    const s = [
        parseExpression(start, { currentDate }).prev().getTime(),
        parseExpression(start, { currentDate }).next().getTime()
    ];
    const e = [
        parseExpression(end, { currentDate }).prev().getTime(),
        parseExpression(end, { currentDate }).next().getTime()
    ];
    const not_asce = [e[0], s[0], currentDate, e[1], s[1]].some((v, i, a) => i && a[i - 1] > v);
    return not_asce ? {} : { start: s[0], end: e[1] };
};

const getEventCount = (row: TRecord<IChecklistModel>, start: number, end: number) => {
    const { sql, params } = conditional(efields, { start: { gte: start, lte: end }, topic: row.topic }, 'e.');
    let _sql = 'SELECT COUNT(*) AS count FROM event e';
    if (row.tag) _sql += ' INNER JOIN event_tag et ON et.event_id = e.id';
    _sql += sql;
    if (row.tag) {
        _sql += ' AND et.tag_id = :tag';
        params.tag = row.tag;
    }
    const { count } = db.prepare(_sql).get(params) as { count: number };
    return count;
};
const getPunchCount = (row: TRecord<IChecklistModel>, start: number, end: number) => {
    const { sql, params } = conditional(pfields, { start: { gte: start, lte: end }, title: row.title });
    const _sql = 'SELECT COUNT(*) AS count FROM punch' + sql;
    const { count } = db.prepare(_sql).get(params) as { count: number };
    return count;
};

export const useChecklistService = () => {
    const listFiltered = () => {
        return db.transaction(() => {
            const data = controller.list({ active: 1 });
            const records = data.reduce((res, row) => {
                const { start, end } = getTime(row);
                if (!start || !end) return res;
                const count = row.module === 'event' ? getEventCount(row, start, end) : getPunchCount(row, start, end);
                if (count <= 0) res.push(row);
                return res;
            }, [] as IChecklistModel[]);
            return records;
        })();
    };

    return { ...useService(controller), listFiltered };
};
