import { useService } from '../base';
import { useTopicController } from './topic.controller';

const controller = useTopicController();

export const useTopicService = () => {
    return useService(controller);
};
