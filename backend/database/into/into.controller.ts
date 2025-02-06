import { fields } from '.';
import { useController } from '../base';
import type { IIntoModel } from './into';

export const useIntoController = () => {
    return useController<IIntoModel>('into_item', fields);
};
