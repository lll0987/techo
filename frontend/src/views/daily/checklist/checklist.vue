<template>
    <div card min-h-12 px-4 py-3>
        <div v-if="!checklist.length" flex flex-col items-center justify-center gap-1 p-1>
            <i text-secondary-content>
                <icon-chess-queen size="3rem" />
            </i>
            <span>没有待办事项</span>
        </div>
        <ul v-else>
            <li v-for="item in checklist">
                <p class="marker">{{ item.title }}</p>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useChecklistApi } from '@/api';
import type { IChecklistModel, TRecord } from '@/contracts';
import { IconChessQueen } from '@tabler/icons-vue';
import { ref } from 'vue';

const checklist = ref<TRecord<IChecklistModel>[]>([]);
const { list } = useChecklistApi();
const getList = async () => {
    const [, data] = await list();
    checklist.value = data;
};
getList();
</script>
