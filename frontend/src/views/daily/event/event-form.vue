<template>
    <div flex flex-col gap-4 p-4>
        <div inline-flex>
            <button
                v-for="(item, index) in grains"
                type="button"
                class="btn btn-default btn-medium join-item"
                :class="{ 'btn-positive': grain === index }"
                @click="updateGrain(index)"
            >
                {{ item }}
            </button>
        </div>
        <label v-if="grain === 0b00" class="input-field w-40">
            <span font-600>时间</span>
            <input type="time" class="input" :value="startStr" @input="onStartInput" />
        </label>
        <time-range v-if="grain === 0b01" v-model:start="start" v-model:end="end" class="w-80" />
        <label v-if="grain === 0b11" class="input-field w-60">
            <span font-600>结束日期</span>
            <input type="date" class="input" :value="endStr" @input="onEndInput" />
        </label>
        <h-select label="主题" v-model="topic" :options="topicOptions"></h-select>
        <h-select label="标签" v-model="tag" :options="tagOptions" multiple></h-select>
        <label class="input-field">
            <span font-600>数值</span>
            <input type="text" class="input" :value="value" @input="onValueInput" @blur="onValueBlur" />
        </label>
        <label class="input-field">
            <span font-600>标题</span>
            <input type="text" class="input" v-model="title" />
        </label>
        <label class="input-field">
            <span font-600>备注</span>
            <input type="text" class="input" v-model="remark" />
        </label>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { HSelect, TimeRange } from '@/components';
import { useTagStore, useTopicStore } from '@/store';
import { EventFormDataKey, useEventForm } from './use-event-form';

const {
    grains,
    grain,
    updateGrain,
    start,
    startStr,
    onStartInput,
    end,
    endStr,
    onEndInput,
    topic,
    tag,
    value,
    onValueInput,
    onValueBlur,
    title,
    remark
} = inject(EventFormDataKey, useEventForm());

const { tagOptions } = useTagStore();
const { topicOptions } = useTopicStore();
</script>
