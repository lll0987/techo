import { computed, ref } from 'vue';

const dark = ref(false);
const updateTheme = (isDark: boolean = !dark.value) => {
    dark.value = isDark;
};

const theme = computed(() => (dark.value ? 'dark' : ''));
const isDark = computed(() => dark.value);

export const useThemeStore = () => {
    return { theme, updateTheme, isDark };
};
