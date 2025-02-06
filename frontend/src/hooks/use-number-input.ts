import { computed, ref } from 'vue';

const parseNumber = (value: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) return '';
    return val + '';
};

export const useNumberInput = () => {
    const inputValue = ref('');
    const parseValue = computed(() => parseNumber(inputValue.value));
    const onInput = (e: InputEvent | Event): void => {
        const targetValue = (e.target as HTMLInputElement).value;
        inputValue.value = targetValue;
    };

    const onBlur = () => {
        inputValue.value = parseValue.value;
    };

    return { inputValue, onInput, onBlur };
};
