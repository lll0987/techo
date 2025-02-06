import { fields } from '.';
import { useController } from '../base';
import type { TEvent, IEventModel, IEventTagModel } from './event';

const data2row = (data: TEvent) =>
    ({
        start: data.start,
        end: data.end,
        grain: data.grain,
        topic: data.topic,
        value: data.value === undefined ? null : data.value,
        remark: data.remark === undefined ? null : data.remark,
        title: data.title === undefined ? null : data.title
    } as IEventModel);

const controller = useController<IEventModel>('event', fields);
export const useEventController = () => {
    const create = (data: TEvent) => {
        return controller.create(data2row(data));
    };
    const batchCreate = (data: TEvent[]) => {
        return controller.batchCreate(data.map(data2row));
    };
    const update = controller.update;
    const remove = controller.remove;
    const list = controller.list;

    return { create, batchCreate, update, remove, list };
};

export const useEventTagController = () => {
    return useController<IEventTagModel>('event_tag', ['event_id', 'tag_id']);
};
