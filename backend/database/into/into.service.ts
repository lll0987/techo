import { db } from '..';
import type { IInto, IIntoModel } from './into';
import { useService } from '../base';
import { useEventController, useEventTagController } from '../event';
import { useGoodsController } from '../goods';
import { useIntoController } from './into.controller';

const controller = useIntoController();
const eventController = useEventController();
const goodsController = useGoodsController();
const eventTagController = useEventTagController();

const calc_price = (amount: number, qty: number) => {
    return Math.floor(amount / qty);
};

export const useIntoService = () => {
    const createIntoEvent = (data: IInto) => {
        return db.transaction(() => {
            const { items, tags, ...event } = data;
            // 总金额记录在事件中
            const value = items.reduce((r, i) => (r += i.amount), 0);
            // 创建事件
            const event_id = eventController.create({ ...event, value });
            // 创建事件标签
            for (const tag_id of tags) {
                eventTagController.create({ event_id, tag_id });
            }
            // 创建入库记录
            const models = items.reduce((res, item) => {
                const amount = Math.round(item.amount * 100);
                const price = calc_price(amount, item.qty);
                const unit_price = calc_price(amount, item.unit_qty);
                const into_item = {
                    amount,
                    price,
                    unit_price,
                    qty: item.qty,
                    unit_qty: item.unit_qty,
                    tag: item.tag || null,
                    specs: item.specs || null,
                    remark: item.remark || null,
                    event: event_id
                };
                if (typeof item.goods === 'number') {
                    res.push({ ...into_item, goods: item.goods });
                }
                // 创建物品
                if (typeof item.goods === 'object') {
                    const gid = goodsController.create(item.goods);
                    res.push({ ...into_item, goods: gid });
                }
                return res;
            }, [] as IIntoModel[]);
            return controller.batchCreate(models);
        })();
    };

    return { ...useService(controller), createIntoEvent };
};
