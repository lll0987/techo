import type { InjectionKey, Ref } from 'vue';

import Sleep from './sleep.vue';

export default Sleep;

export type SleepForm = { start: number | null; end: number | null; id?: number };
export interface SleepStore {
    getSleepEvents: () => Promise<void>;
    getBedEvents: () => Promise<void>;
    editing: Ref<boolean>;
    sleep_list: Ref<SleepForm[]>;
    handleAddSleep: () => void;
    handleValidateSleep: () => string;
    bed_list: Ref<SleepForm[]>;
    handleAddBed: () => void;
    handleValidateBed: () => string;
}
export const SleepStoreKey: InjectionKey<SleepStore> = Symbol('sleep-store');
