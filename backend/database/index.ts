import sqlite from 'better-sqlite3';

const path = process.env.NODE_ENV === 'test' ? './test.sqlite' : './database.sqlite';
const db = sqlite(path);
export { db };
