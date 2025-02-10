<template>
    <section>
        <button type="button" class="btn btn-medium btn-info w-full" @click="show = true">购物/出二手</button>
        <drawer v-model:show="show">
            <div class="grid rows-[auto_1fr_auto] h-full">
                <drawer-header pb-2></drawer-header>
                <div overflow-y-auto>
                    <div flex px-4>
                        <button
                            type="button"
                            class="btn btn-medium join-item flex-1"
                            :class="mod === 'i' ? 'btn-secondary' : 'btn-default'"
                            @click="mod = 'i'"
                        >
                            购物
                        </button>
                        <button
                            type="button"
                            class="btn btn-medium join-item flex-1"
                            :class="mod === 'o' ? 'btn-secondary' : 'btn-default'"
                            @click="mod = 'o'"
                        >
                            出二手
                        </button>
                    </div>
                    <event-form :fields="['remark', 'tag', 'title']"></event-form>
                    <div class="grid cols-[repeat(auto-fit,_minmax(10rem,_1fr))] gap-2 px-2">
                        <div
                            v-for="item in items"
                            class="bg-base-200 border-2 rounded-3 flex flex-col gap-2 p-2"
                            :class="item.danger ? 'border-error' : 'border-base-300'"
                        >
                            <h-select
                                v-model="item.goods"
                                :options="goodsOptions"
                                placeholder="选择一个物品"
                            ></h-select>
                            <label class="input-field">
                                <input
                                    type="text"
                                    class="input"
                                    placeholder="价格"
                                    required
                                    :pattern="regAmount.source"
                                    v-model="item.amount"
                                    @blur="onBlurAmount(item)"
                                />
                            </label>
                            <label class="input-field">
                                <input
                                    type="text"
                                    class="input"
                                    placeholder="数量"
                                    required
                                    :pattern="regQty.source"
                                    v-model="item.qty"
                                    @blur="onBlurQty(item)"
                                />
                            </label>
                            <label class="input-field">
                                <input type="text" class="input" placeholder="规格" :value="item.specs" />
                            </label>
                            <h-select v-model="item.tag" :options="tagOptions" placeholder="标签"></h-select>
                            <label class="input-field">
                                <input type="text" class="input" placeholder="备注" :value="item.remark" />
                            </label>
                        </div>
                        <button class="btn btn-default border-dashed bg-transparent rounded-3 py-4" @click="onAdd">
                            <icon-plus size="1.5rem" />
                        </button>
                    </div>
                </div>
                <div flex gap-4 px-4 py-2>
                    <button type="button" class="btn btn-medium btn-primary" @click="onConfirm">提交</button>
                </div>
            </div>
        </drawer>
    </section>
</template>

<script setup lang="ts">
import { provide, ref } from 'vue';
import { IconPlus } from '@tabler/icons-vue';
import type { TInItem, TOutItem } from '@/contracts';
import type { SelectItem } from '@/components/select';
import { useGoodsApi, useIntoApi, useOutApi } from '@/api';
import { useTagStore } from '@/store';
import { Drawer, HSelect, useAlert } from '@/components';
import { DrawerHeader } from '@/components/drawer';
import { EventForm } from '../event';
import { EventFormDataKey, useEventForm } from '../event/use-event-form';

// event 表单
const { getEventModel, reset, ...data } = useEventForm(0);
provide(EventFormDataKey, data);

// 标签列表
const { tagOptions } = useTagStore();

// 物品列表
const goodsOptions = ref<SelectItem[]>([]);
const { list } = useGoodsApi();
const getGoods = async () => {
    const [, data] = await list();
    goodsOptions.value = data.map(({ id, name }) => ({ value: String(id), label: name }));
};
getGoods();

// 详情
interface Item {
    goods?: string;
    amount?: string;
    qty?: string;
    specs?: string;
    remark?: string;
    tag?: string;
    danger: boolean;
}
const items = ref<Item[]>([]);
const onAdd = () => {
    items.value.push({ danger: false });
};

// drawer
const show = ref(false);
const mod = ref<'i' | 'o'>('i');

const regAmount = /^(\d+(\.\d+)?|\.\d+)(\*\d+)*$/;
const regQty = /^(\d+)(\*\d+)*$/;

// 价格的第二个数默认为数量
const onBlurAmount = (item: Item) => {
    if (!item.amount) return;
    const [, ...arr] = item.amount.split('*');
    if (!arr.length || item.qty) return;
    item.qty = String(arr.reduce((r, n, i) => (i ? (r *= Number(n)) : r), 1));
};
// 数量的第二个数默认为规格
const onBlurQty = (item: Item) => {
    if (!item.qty) return;
    const [, ...arr] = item.qty.split('*');
    if (!arr.length || item.specs) return;
    item.specs = arr.join('*');
};

const getIntoItems = () => {
    return items.value.map(item => {
        const arr = item.amount!.split('*');
        const qarr = item.qty!.split('*');
        return {
            goods: Number(item.goods),
            tag: item.tag ? Number(item.tag) : null,
            specs: item.specs,
            remark: item.remark,
            amount: Number(arr[0]),
            unit_price: arr.reduce((r, n) => (r *= Number(n)), 1),
            qty: Number(qarr[0]),
            unit_qty: qarr.reduce((r, n) => (r *= Number(n)), 1)
        };
    }) as TInItem[];
};
const getOutItems = () => {
    return items.value.map(item => {
        return {
            goods: Number(item.goods),
            tag: item.tag ? Number(item.tag) : null,
            specs: item.specs,
            remark: item.remark,
            quantity: item.qty!.split('*').reduce((r, n) => (r *= Number(n)), 1),
            amount: item.amount ? item.amount.split('*').reduce((r, n) => (r *= Number(n)), 1) : null
        };
    }) as TOutItem[];
};

// 提交
const alert = useAlert();
const { createIntoEvent } = useIntoApi();
const { createOutEvent } = useOutApi();
const onConfirm = async () => {
    const event = getEventModel();
    if (!event) return;
    if (!items.value.length) return alert.error('请填写至少一项详情');
    for (const item of items.value) {
        let msg;
        if (!item.goods) msg = '请选择一个物品';
        if (mod.value === 'i' && !item.amount) msg = '请填写价格';
        if (item.amount && !regAmount.test(item.amount)) msg = '价格格式不正确';
        if (!item.qty) msg = '请填写数量';
        if (!regQty.test(item.qty!)) msg = '数量格式不正确';
        if (msg) {
            alert.error(msg);
            item.danger = true;
            return;
        }
    }
    const fn =
        mod.value === 'i'
            ? createIntoEvent({ ...event, items: getIntoItems() })
            : createOutEvent({ ...event, items: getOutItems() });
    const [msg] = await fn;
    if (msg) {
        alert.error(msg);
        return;
    }
    alert.success('保存成功');
    reset();
    items.value = [];
};
</script>
