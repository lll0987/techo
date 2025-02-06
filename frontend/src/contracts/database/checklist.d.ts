export type TChecklistModule = 'event' | 'punch';

export interface IChecklistModel {
    // 标题
    title: string;
    // 主题
    topic: number;
    // 标签
    tag: number | null;
    // 开始规则
    start: string;
    // 结束规则
    end: string;
    // 是否启用
    active: 1 | 0;
    // 模块
    module: TChecklistModule;
}

export type IChecklistItem = IChecklistModel & { count: number };
