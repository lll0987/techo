<template>
    <label ref="triggerEl" class="input-field">
        <span v-if="label" font-600>{{ label }}</span>
        <button
            class="input inline-flex items-center gap-1.5"
            :id="id"
            :popovertarget="popoverId"
            :disabled="disabled"
            @keydown.enter.stop="handelEnter"
            @keydown.down.stop.prevent="handleArrowFocus(KEYBOARD_EVENT.DOWN)"
            @keydown.up.stop.prevent="handleArrowFocus(KEYBOARD_EVENT.UP)"
        >
            <p v-if="!selectLabel.length" class="text-placeholder text-start">{{ placeholder }}</p>
            <p v-else-if="!multiple" text-start>{{ selectLabel[0] }}</p>
            <template v-else>
                <p v-for="(value, index) in selectLabel" :key="index" class="select-tag">
                    {{ value }}
                </p>
            </template>
        </button>
        <i class="select-arrow"><icon-caret-down-filled size="1.25rem" /></i>
        <select-menu :id="popoverId" :style="styles"></select-menu>
    </label>
</template>

<script setup lang="ts">
import { computed, provide, toRefs, watch } from 'vue';
import { IconCaretDownFilled } from '@tabler/icons-vue';
import type { SelectItem, SelectProps, SelectValue } from './select.type';
import { KEYBOARD_EVENT, SelectApiKey } from './select.type';
import { useSelectOptions } from './use-select-options';
import { useSelectFocus } from './use-select-focus';
import { useSelectSelected } from './use-select-selected';
import SelectMenu from './select-menu.vue';
import { useSelectPopover } from './use-select-popover';

// popover
const { id, popoverId, popoverState, updateShow, hidePopover, triggerEl, styles } = useSelectPopover();

// props & emits
const props = defineProps<SelectProps>();
const { multiple, loading, disabled, label, placeholder } = toRefs(props);

// value
const modelValue = defineModel<SelectValue>();
const updateValue = (value: SelectValue) => {
    modelValue.value = value;
};
const selectValue = computed(() => {
    const { value } = modelValue;
    if (!value?.length) return [];
    if (typeof value === 'string') return [value];
    return value;
});

// match
const { matchOptions, matchLabel, options } = useSelectOptions(props);
const selectLabel = computed(() => selectValue.value.map(v => options.value.find(i => i.value === v)?.label));

// focus
const { focusValue, updateFoucus, isFocus, handleAutoFocus, handleArrowFocus } = useSelectFocus({
    matchOptions,
    selectValue
});

// selected
const { handleItemSelected } = useSelectSelected({
    hidePopover,
    updateValue,
    selectValue,
    focusValue,
    multiple
});

// api
const isSelected = (item: SelectItem) => {
    return selectValue.value.includes(item.value);
};
provide(SelectApiKey, {
    loading,
    matchOptions,
    updateShow,
    updateFoucus,
    isFocus,
    isSelected,
    handleItemSelected
});

// watch
watch(matchLabel, value => {
    if (value) {
        handleAutoFocus();
    } else {
        const value = multiple.value ? [] : '';
        updateValue(value);
        updateFoucus();
    }
});

// enter event
const handelEnter = (e: KeyboardEvent) => {
    if (popoverState.value) {
        handleItemSelected();
        e.preventDefault();
    }
};
</script>
