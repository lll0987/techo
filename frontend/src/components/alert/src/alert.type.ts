import type { InjectionKey } from 'vue';
import type { TState } from '@/contracts';

export interface AlertApi {
    info: (message: string) => void;
    success: (message: string) => void;
    warning: (message: string) => void;
    error: (message: string) => void;
}
export const AlertApiInjectionKey: InjectionKey<AlertApi> = Symbol('alert-api');

export type AlertType = Extract<TState, 'danger' | 'warning' | 'positive'>;
export interface AlertProps {
    message: string;
    status?: AlertType;
    duration?: number;
}
