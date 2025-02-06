import { db } from '..';
import { useService } from '../base';
import { useEventController, useEventTagController } from '../event';
import { useOutController } from './out.controller';
import type { IOut, IOutModel } from './out';

const controller = useOutController();
const eventController = useEventController();
const eventTagController = useEventTagController();

export const useOutService = () => {
    const createOutEvent = (data: IOut) => {
        return db.transaction(() => {
            const { items, tags, ...event } = data;
            // 总金额记录在事件中
            const value = items.every(i => typeof i.amount !== 'number')
                ? items.reduce((r, i) => (r += i.amount || 0), 0)
                : event.value;
            // 创建事件
            const event_id = eventController.create({ ...event, value });
            // 创建事件标签
            for (const tag_id of tags) {
                eventTagController.create({ event_id, tag_id });
            }
            // 创建出库记录
            const models = items.map(item => ({
                goods: item.goods,
                tag: item.tag || null,
                event: event_id,
                quantity: item.quantity,
                amount: item.amount ? Math.round(item.amount * 100) : null,
                specs: item.specs || null,
                remark: item.remark || null
            })) as IOutModel[];
            return controller.batchCreate(models);
        })();
    };

    return { ...useService(controller), createOutEvent };
};
