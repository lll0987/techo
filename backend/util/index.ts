export const isSameArray = (a: any[], b: any[]) => a.length === b.length && new Set([...a, ...b]).size === a.length;
