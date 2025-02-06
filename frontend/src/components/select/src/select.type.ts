import type { ComputedRef, InjectionKey, Ref } from 'vue';
import type { TSize } from '@/contracts';

export enum KEYBOARD_EVENT {
    DOWN = 'ArrowDown',
    ENTER = 'Enter',
    UP = 'ArrowUp'
}

export type SelectValue = string | string[];

export interface SelectItem {
    label: string;
    value: string;
    [k: string]: string | number | boolean | null;
}

export interface SelectProps {
    options?: SelectItem[];
    loading?: boolean;
    multiple?: boolean;
    match?: string;
    size?: TSize;
    disabled?: boolean;
    label?: string;
    placeholder?: string;
}

export interface SelectApi {
    loading: Ref<boolean>;
    matchOptions: ComputedRef<SelectItem[]>;
    updateShow: (state: boolean) => void;
    updateFoucus: (index?: number) => void;
    isFocus: (index: number) => boolean;
    isSelected: (item: SelectItem) => boolean;
    handleItemSelected: (item?: SelectItem) => void;
}

export const SelectApiKey: InjectionKey<SelectApi> = Symbol('select-api');
