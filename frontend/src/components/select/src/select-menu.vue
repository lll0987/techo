<template>
    <div :id="id" ref="popoverRef" popover class="select-menu">
        <div v-if="loading" class="text-center cursor-wait">
            <icon-loader2 size="1.5rem" class="animate-spin"></icon-loader2>
        </div>
        <menu v-else class="w-full h-full flex flex-col gap-1">
            <li
                v-for="(item, index) in matchOptions"
                :key="item.value"
                class="select-menu-item"
                :class="{ 'select-menu-item-focus': isFocus(index), 'select-menu-item-selected': isSelected(item) }"
                @click.stop="handleItemSelected(item)"
                @dblclick.stop="handleItemSelected(item)"
                @mouseenter.stop="updateFoucus(index)"
            >
                <input
                    class="absolute inset-0 opacity-0 cursor-[inherit]"
                    type="radio"
                    :name="id"
                    :value="item.value"
                />
                <span>{{ item.label }}</span>
            </li>
        </menu>
    </div>
</template>

<script setup lang="ts">
import { inject, ref, toRefs } from 'vue';
import { useEventListener } from '@vueuse/core';
import { IconLoader2 } from '@tabler/icons-vue';
import { SelectApiKey } from './select.type';

// id
const props = defineProps<{ id: string }>();
const { id } = toRefs(props);

// MEMO select-menu 不单独使用，必须 provide api
const { loading, matchOptions, handleItemSelected, updateShow, updateFoucus, isFocus, isSelected } =
    inject(SelectApiKey)!;

// state
const popoverRef = ref<HTMLDivElement | null>(null);
useEventListener(popoverRef, 'toggle', e => {
    const event = e as ToggleEvent;
    updateShow(event.newState === 'open');
});
</script>
