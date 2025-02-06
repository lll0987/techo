import { useService } from '../base';
import { useTagController } from './tag.controller';

const controller = useTagController();

export const useTagService = () => {
    return useService(controller);
};
