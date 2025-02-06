import { db } from '..';
import { isSameArray } from '../../util';
import { conditional, order_by } from '../base';
import type { TRecord, TRecordSort } from '../base/database';
import type { IEvent, IEventFilter, IEventModel } from './event';
import { fields } from '.';
import { useEventController, useEventTagController } from './event.controller';

const controller = useEventController();
const tagController = useEventTagController();

export const useEventService = () => {
    // ----------------------------------- 增 -----------------------------------
    const create = (data: IEvent) => {
        return db.transaction(() => {
            const event_id = controller.create(data);
            for (const tag_id of data.tags) {
                tagController.create({ event_id, tag_id });
            }
            return event_id;
        })();
    };
    const batchCreate = (data: IEvent[]) => {
        return db.transaction(() => {
            const ids = [];
            for (const row of data) {
                const event_id = controller.create(row);
                for (const tag_id of row.tags) {
                    tagController.create({ event_id, tag_id });
                }
                ids.push(event_id);
            }
            return ids;
        })();
    };
    // ----------------------------------- 改 -----------------------------------
    const update = (id: number, data: Partial<IEvent>) => {
        return db.transaction(() => {
            // 更新标签
            if (data.tags?.length) {
                const tags = tagController.list({ event_id: id }).map(i => i.tag_id);
                if (!isSameArray(tags, data.tags)) {
                    db.prepare('DELETE FROM event_tag WHERE event_id = ?').run(id);
                    for (const tag_id of data.tags) {
                        tagController.create({ event_id: id, tag_id });
                    }
                }
            }
            // 更新数据
            return controller.update(id, data);
        })();
    };
    // ----------------------------------- 删 -----------------------------------
    const remove = (id: number) => {
        return db.transaction(() => {
            return controller.remove(id);
        })();
    };
    // ----------------------------------- 查 -----------------------------------
    const list = (filter?: IEventFilter, sort?: TRecordSort<IEventModel>) => {
        return db.transaction(() => {
            const { sql, params } = conditional(fields, filter, 'e.');
            let _sql = 'SELECT e.* FROM event e';
            if (filter?.tag) _sql += ' INNER JOIN event_tag et ON e.id = et.event_id';
            _sql += sql;
            if (filter?.tag) {
                _sql += sql ? ' AND' : ' WHERE';
                _sql += ' et.tag_id = :tag';
                params.tag = filter?.tag;
            }
            const order = order_by(fields, sort, 'e.');
            _sql += order;
            const records = db.prepare(_sql).all(params) as TRecord<IEventModel>[];
            return records;
        })();
    };
    const getMaxByTopic = (filter: { topic: number } & Pick<IEventFilter, 'start' | 'end'>) => {
        return db.transaction(() => {
            const { sql, params } = conditional(['topic', 'start', 'end'], filter);
            const _sql = 'SELECT * FROM event' + sql + ' ORDER BY start DESC LIMIT 1';
            return db.prepare(_sql).get(params) as TRecord<IEventModel>;
        })();
    };
    // ----------------------------------- 写 -----------------------------------
    const batchWrite = (data: Array<{ id?: number } & IEvent>) => {
        return db.transaction(() => {
            for (const { id, tags, ...row } of data) {
                let event_id = id;
                if (event_id) {
                    // 更新数据
                    controller.update(event_id, row);
                    // 更新标签
                    const tagids = tagController.list({ event_id }).map(i => i.tag_id);
                    if (!isSameArray(tags, tagids)) {
                        db.prepare('DELETE FROM event_tag WHERE event_id = ?').run(id);
                    }
                } else {
                    // 新增数据
                    event_id = controller.create(row);
                }
                // 新增标签
                if (tags.length) {
                    for (const tag_id of tags) {
                        tagController.create({ event_id, tag_id });
                    }
                }
            }
            return true;
        })();
    };

    return { create, batchCreate, update, remove, list, getMaxByTopic, batchWrite };
};
