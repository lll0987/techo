<template>
    <section bg-primary rounded-tl-4 px-3 py-2 flex items-center justify-end gap-1>
        <button
            type="button"
            title="标签"
            class="btn p-1 rounded-full text-primary-content hover:bg-white/13"
            @click="onClick('tag')"
        >
            <icon-tag size="1.25rem" />
        </button>
        <button
            type="button"
            title="主题"
            class="btn p-1 rounded-full text-primary-content hover:bg-white/13"
            @click="onClick('topic')"
        >
            <icon-bookmark size="1.25rem" />
        </button>
        <button
            type="button"
            title="切换到深色模式"
            class="btn p-0.5 pl-2 rounded-full text-base-100 hover:bg-white/13"
        >
            <icon-sun size="1.75rem" />
        </button>
        <drawer v-model:show="show">
            <div p-3>
                <div flex gap-2 items-center mb-4>
                    <h-select v-model="color" :options="colors" placeholder="请选择颜色" class="flex-1"></h-select>
                    <label class="input-field flex-1">
                        <input v-model="name" type="text" class="input" placeholder="请输入名称" />
                    </label>
                    <button type="button" class="btn btn-medium btn-primary" @click="onSubmit">添加</button>
                </div>
                <div flex flex-wrap gap-2>
                    <div
                        v-for="item in list"
                        :class="item.editing ? `${mod}-base` : `${mod}-${item.color}`"
                        @dblclick="item.editing = true"
                    >
                        <span v-show="!item.editing">{{ item.name }}</span>
                        <h-select
                            v-show="item.editing"
                            v-model="item.color"
                            :options="colors"
                            placeholder="请选择颜色"
                        ></h-select>
                        <label v-show="item.editing" class="input-field">
                            <input v-model="item.name" type="text" class="input" placeholder="请输入名称" />
                        </label>
                        <button
                            v-show="item.editing"
                            type="button"
                            class="btn btn-circle btn-danger"
                            @click="onRemove(item)"
                        >
                            <icon-trash size="1.25rem" />
                        </button>
                        <button
                            v-show="item.editing"
                            type="button"
                            class="btn btn-circle btn-positive"
                            @click="onUpdate(item)"
                        >
                            <icon-check size="1.25rem" />
                        </button>
                        <button
                            v-show="item.editing"
                            type="button"
                            class="btn btn-circle btn-default"
                            @click="item.editing = false"
                        >
                            <icon-x size="1.25rem" />
                        </button>
                    </div>
                </div>
            </div>
        </drawer>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { IconBookmark, IconCheck, IconTag, IconTrash, IconSun, IconX } from '@tabler/icons-vue';
import type { TRecord } from '@/contracts';
import { useTagStore, useTopicStore } from '@/store';
import { Drawer, HSelect, useAlert } from '@/components';
import { useTagApi, useTopicApi } from '@/api';

const colors = ['primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error', 'base'].map(i => ({
    label: i,
    value: i
}));

const { tagList, refreshTag } = useTagStore();
const { topicList, refreshTopic } = useTopicStore();
refreshTag();
refreshTopic();

type TMod = 'tag' | 'topic';
const mod = ref<TMod>('tag');

type TItem = TRecord<{ name: string; color: string; editing: boolean }>;
const list = ref<TItem[]>([]);
const setList = () => {
    list.value = (mod.value === 'tag' ? tagList.value : topicList.value).map(({ id, name, color }) => ({
        id,
        name,
        color,
        editing: false
    }));
};

const show = ref(false);
const onClick = (m: TMod) => {
    mod.value = m;
    setList();
    show.value = true;
};

const alert = useAlert();
const { create: createTag, update: updateTag, remove: removeTag } = useTagApi();
const { create: createTopic, update: updateTopic, remove: removeTopic } = useTopicApi();

const name = ref('');
const color = ref('');
const onSubmit = async () => {
    if (!name.value || !color.value) return alert.error('请填写名称和颜色');
    const [msg] = await (mod.value === 'tag'
        ? createTag({ name: name.value, color: color.value, sub_color: null, alias: null })
        : createTopic({ name: name.value, color: color.value }));
    if (msg) {
        alert.error(msg);
        return;
    }
    name.value = '';
    color.value = '';
    await (mod.value === 'tag' ? refreshTag() : refreshTopic());
    setList();
};

const onUpdate = async (item: TItem) => {
    if (!item.name || !item.color) return alert.error('请填写名称和颜色');
    const update = mod.value === 'tag' ? updateTag : updateTopic;
    const [msg] = await update(item.id!, { name: item.name, color: item.color });
    if (msg) {
        alert.error(msg);
        return;
    }
    item.editing = false;
    await (mod.value === 'tag' ? refreshTag() : refreshTopic());
    setList();
};

const onRemove = async (item: TItem) => {
    const remove = mod.value === 'tag' ? removeTag : removeTopic;
    const [msg] = await remove(item.id!);
    if (msg) {
        alert.error(msg);
        return;
    }
    await (mod.value === 'tag' ? refreshTag() : refreshTopic());
    setList();
};
</script>
