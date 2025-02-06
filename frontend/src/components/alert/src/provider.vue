<!-- MEMO Alert.Z = 3000 -->
<!-- MEMO Alert.top = 16px -->
<template>
    <div>
        <slot></slot>
        <teleport to="body">
            <div z-3000 top="[16px]" class="flex flex-col items-center gap-3 fixed left-0 right-0 h-0 overflow-visible">
                <message v-for="item in messageList" :key="item.id" v-bind="item.options"></message>
            </div>
        </teleport>
    </div>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { AlertApiInjectionKey } from '..';
import type { AlertApi, AlertProps } from '..';
import Message from './alert.vue';

interface IMessage {
    id: string;
    timer: number | null;
    options: AlertProps;
}

let seed = 0;
const getId = () => `message-${seed++}`;

// MEMO Alert.duration = 3000
const defaultDuration = 3000;

const messageList = ref<IMessage[]>([]);

/**
 * 隐藏 Alert
 * @param id
 */
const close = (id: string) => {
    const index = messageList.value.findIndex(message => message.id === id);

    let { timer } = messageList.value[index];
    if (timer) {
        window.clearTimeout(timer);
        timer = null;
    }

    messageList.value.splice(index, 1);
};

/**
 * 创建 Alert
 * @param options
 */
const create = (options: AlertProps) => {
    const id = getId();

    const { duration = defaultDuration } = options;
    const timer = window.setTimeout(() => close(id), duration);

    messageList.value.push({ id, timer, options });
};

const api: AlertApi = {
    info: (message: string) => create({ message }),
    success: (message: string) => create({ message, status: 'positive' }),
    warning: (message: string) => create({ message, status: 'warning' }),
    error: (message: string) => create({ message, status: 'danger' })
};

provide(AlertApiInjectionKey, api);
</script>
