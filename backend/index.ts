import fs from 'fs';
import { createApp } from './app';
import { db } from './database';

// 迁移
const migrate = async () => {
    const files = fs.readdirSync('migrate');
    for (const file of files) {
        const sql = fs.readFileSync(`migrate/${file}`, { encoding: 'utf8' });
        db.exec(sql);
    }
};
migrate();

// 后台服务
createApp();
