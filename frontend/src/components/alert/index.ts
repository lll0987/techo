import { inject } from 'vue';
import { AlertApiInjectionKey } from './src/alert.type';

export * from './src/alert.type';

export const useAlert = () => {
    const api = inject(AlertApiInjectionKey);
    if (api) return api;
    throw new Error('[useAlert]: No outer <alert-provider /> founded.');
};

export { default as AlertProvider } from './src/provider.vue';
