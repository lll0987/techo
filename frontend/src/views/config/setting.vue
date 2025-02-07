<template>
    <button type="button" :title="mode_title" class="btn setting-item" @click="handleMode">
        <icon-moon v-if="isDark" size="1.75rem" />
        <icon-sun v-else size="1.75rem" />
    </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IconSun, IconMoon } from '@tabler/icons-vue';
import { useThemeStore } from '@/store';

const { theme, updateTheme, isDark } = useThemeStore();
const mode_title = computed(() => (isDark.value ? '切换到浅色' : '切换到深色'));
const handleMode = () => {
    updateTheme();
    document.documentElement.setAttribute('data-theme', theme.value);
};
</script>
