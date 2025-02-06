import { computed, ref } from 'vue';

const dark = ref(false);
const mode = computed(() => (dark.value ? 'dark' : ''));
const updateMode = (isDark: boolean) => {
    dark.value = isDark;
};

export const useModeStore = () => {
    return { mode, updateMode };
};
