import { fields } from '.';
import { useController } from '../base';
import type { IChecklistModel } from './checklist';

export const useChecklistController = () => {
    return useController<IChecklistModel>('checklist', fields);
};
