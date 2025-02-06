import { fields } from '.';
import { useController } from '../base';
import type { ITopicModel } from './topic';

export const useTopicController = () => {
    return useController<ITopicModel>('topic', fields);
};
