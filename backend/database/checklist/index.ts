import type { IChecklistModel } from './checklist';

export const fields: Array<keyof IChecklistModel> = ['title', 'topic', 'tag', 'start', 'end', 'active', 'module'];

export * from './checklist.controller';
export * from './checklist.service';
export * from './checklist.schema';
