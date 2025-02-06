import { fields } from '.';
import { useController } from '../base';
import type { IOutModel } from './out';

export const useOutController = () => {
    return useController<IOutModel>('out_item', fields);
};
