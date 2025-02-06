import { fields } from '.';
import { useController } from '../base';
import type { ITagModel } from './tag';

export const useTagController = () => {
    return useController<ITagModel>('tag', fields);
};
