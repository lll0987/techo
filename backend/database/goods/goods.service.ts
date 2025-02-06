import { fields } from '.';
import { db } from '..';
import { isSameArray } from '../../util';
import { conditional, order_by } from '../base';
import type { TRecord, TRecordSort } from '../base/database';
import type { IGoods, IGoodsFilter, IGoodsModel } from './goods';
import { useGoodsController, useGoodsTagController } from './goods.controller';

const controller = useGoodsController();
const tagController = useGoodsTagController();

export const useGoodsService = () => {
    const create = (data: IGoods) => {
        return db.transaction(() => {
            const goods_id = controller.create(data);
            for (const tag_id of data.tags) {
                tagController.create({ goods_id, tag_id });
            }
            return goods_id;
        })();
    };
    const batchCreate = (data: IGoods[]) => {
        return db.transaction(() => {
            const ids = [];
            for (const row of data) {
                const goods_id = controller.create(row);
                for (const tag_id of row.tags) {
                    tagController.create({ goods_id, tag_id });
                }
                ids.push(goods_id);
            }
            return ids;
        })();
    };
    const update = (id: number, data: Partial<IGoods>) => {
        return db.transaction(() => {
            // 更新标签
            if (data.tags) {
                const tags = tagController.list({ goods_id: id }).map(i => i.tag_id);
                if (!isSameArray(tags, data.tags)) {
                    db.prepare('DELETE FROM goods_tag WHERE goods_id = ?').run(id);
                    for (const tag_id of data.tags) {
                        tagController.create({ goods_id: id, tag_id });
                    }
                }
            }
            // 更新数据
            return controller.update(id, data);
        })();
    };
    const remove = (id: number) => {
        return db.transaction(() => {
            return controller.remove(id);
        })();
    };
    const list = (filter?: IGoodsFilter, sort?: TRecordSort<IGoodsModel>) => {
        return db.transaction(() => {
            const { sql, params } = conditional(fields, filter, 'g.');
            let _sql = 'SELECT g.* FROM goods g';
            if (filter?.tag) _sql += ' INNER JOIN goods_tag gt ON g.id = gt.goods_id';
            _sql += sql;
            if (filter?.tag) {
                _sql += sql ? ' AND' : ' WHERE';
                _sql += ' gt.tag_id = :tag';
                params.tag = filter?.tag;
            }
            const order = order_by(fields, sort, 'g.');
            _sql += order;
            const records = db.prepare(_sql).all(params) as TRecord<IGoodsModel>[];
            return records;
        })();
    };

    return { create, batchCreate, update, remove, list };
};
