import { useId } from '@/hooks';
import { useElementBounding } from '@vueuse/core';
import { computed, ref } from 'vue';

// MEMO popover 弹出层与触发元素间距 2px
const gap = 8;
// NEXT popover 获取弹出层实际高度
const height = 200;

interface PopoverStyle {
    left?: string;
    top?: string;
    width?: string;
}

export const useSelectPopover = () => {
    // id
    const id = useId().next();
    const popoverId = useId().next();

    // style
    const triggerEl = ref<HTMLDivElement | null>(null);
    const { bottom, left, top, width, update } = useElementBounding(triggerEl);
    const styles = computed(() => {
        const value: PopoverStyle = { left: left.value + 'px', width: width.value + 'px' };
        let t = bottom.value + gap;
        // 如果下方空间不足，显示在上方
        if (t + height > window.innerHeight) {
            t = top.value - height - gap;
        }
        value.top = t + 'px';
        return value;
    });

    // show
    const popoverState = ref(false);
    const updateShow = (state: boolean) => {
        popoverState.value = state;
        if (state) update();
    };

    // hide
    const hidePopover = () => {
        const popover = document.getElementById(popoverId);
        popover?.hidePopover();
    };

    return { id, popoverId, popoverState, updateShow, hidePopover, triggerEl, styles };
};
