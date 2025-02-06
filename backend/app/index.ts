import express, { Router } from 'express';
import cors from 'cors';

import eventRouter from './router/event';
import topicRouter from './router/topic';
import tagRouter from './router/tag';
import checklistRouter from './router/checklist';
import punchRouter from './router/punch';
import goodsRouter from './router/goods';
import intoRouter from './router/into';
import outRouter from './router/out';

const routers: Record<string, Router> = {
    '/event': eventRouter,
    '/topic': topicRouter,
    '/tag': tagRouter,
    '/checklist': checklistRouter,
    '/punch': punchRouter,
    '/goods': goodsRouter,
    '/into': intoRouter,
    '/out': outRouter
};

const url = 'http://localhost:5173';

export const createApp = () => {
    const app = express();
    app.use(cors({ origin: url, optionsSuccessStatus: 200 }));
    app.use(express.json());
    for (const key in routers) {
        app.use(key, routers[key]);
    }
    app.listen(3000, () => {
        console.log('server start');
    });
};
