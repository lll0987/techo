<template>
    <div class="alert" :class="`alert-${status || 'info'}`">
        <component :is="iconComponent" size="1.25rem" />
        <span>{{ message }}</span>
    </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import { type Icon, IconAlertTriangle, IconCircleCheck, IconCircleX, IconInfoCircle } from '@tabler/icons-vue';
import type { AlertProps, AlertType } from '..';

const props = defineProps<AlertProps>();
const { message, status } = toRefs(props);

// icon
const IconMap: Record<AlertType, Icon> = {
    positive: IconCircleCheck,
    warning: IconAlertTriangle,
    danger: IconCircleX
};
const iconComponent = computed(() => {
    const { value } = status;
    if (value === undefined) return IconInfoCircle;
    return IconMap[value];
});
</script>
