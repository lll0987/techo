<template>
    <div
        fixed
        top-0
        left-0
        grid
        cols-1
        rows-1
        justify-items-end
        w-full
        h-dvh
        overflow-hidden
        overscroll-contain
        drawer-side-transition
        :style="{ zIndex }"
        :class="show ? ['opacity-100', 'visible'] : ['opacity-0', 'invisible']"
    >
        <div
            sticky
            top-0
            place-self-stretch
            cursor-pointer
            bg-black
            bg-opacity-40
            row-start-1
            col-start-1
            @click.stop="show = false"
        ></div>
        <div
            h-full
            overflow-y-auto
            row-start-1
            col-start-1
            bg-base-100
            text-base-content
            will-change-transform
            drawer-content-transition
            :style="{ width, translate: show ? '0%' : '100%' }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import { useZIndex } from '@/hooks';

const show = defineModel('show', { type: Boolean });

const props = withDefaults(defineProps<{ width?: string }>(), { width: '400px' });
const { width } = toRefs(props);

const zIndex = useZIndex().nextZIndex();
</script>
