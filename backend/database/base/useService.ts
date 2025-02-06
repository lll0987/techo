import { db } from '..';
import type { TRecord, TRecordSort } from './database';
import type { TController } from './useController';

export const useService = <T>(controller: TController<T>) => {
    const list = (filter?: Partial<TRecord<T>>, sort?: TRecordSort<T>) => {
        return db.transaction(() => controller.list(filter, sort))();
    };
    const create = (data: T) => {
        return db.transaction(() => controller.create(data))();
    };
    const batchCreate = (data: T[]) => {
        return db.transaction(() => controller.batchCreate(data))();
    };
    const update = (id: number, data: Partial<T>) => {
        return db.transaction(() => controller.update(id, data))();
    };
    const remove = (id: number) => {
        return db.transaction(() => controller.remove(id))();
    };
    return { list, create, batchCreate, update, remove };
};
