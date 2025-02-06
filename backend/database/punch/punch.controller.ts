import { fields } from '.';
import { useController } from '../base';
import type { IPunchModel } from './punch';

export const usePunchController = () => {
    return useController<IPunchModel>('punch', fields);
};
