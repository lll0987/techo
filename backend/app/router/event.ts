import express from 'express';
import { z } from 'zod';
import {
    eventDateFilterSchema,
    eventFilterSchema,
    eventSchema,
    eventSchema2,
    eventSortSchema,
    useEventService
} from '../../database/event';

const router = express.Router();
const { list, create, batchCreate, update, remove, getMaxByTopic, batchWrite } = useEventService();

// --------------------列表--------------------
router.post('/list', (req, res) => {
    try {
        const { filter, sort } = z
            .object({
                filter: eventFilterSchema.optional(),
                sort: eventSortSchema.optional()
            })
            .parse(req.body);
        res.json([null, list(filter, sort)]);
    } catch (error) {
        res.json(['系统错误', []]);
        console.error(error);
    }
});
router.post('/getMaxEventByTopic', (req, res) => {
    try {
        const filter = z
            .object({
                topic: z.number(),
                start: eventDateFilterSchema.optional(),
                end: eventDateFilterSchema.optional()
            })
            .parse(req.body);
        res.json([null, getMaxByTopic(filter)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});

// --------------------创建--------------------
router.post('/create', (req, res) => {
    try {
        const data = eventSchema.parse(req.body);
        res.json([null, create(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});
router.post('/batchCreate', (req, res) => {
    try {
        const data = eventSchema.array().parse(req.body);
        res.json([null, batchCreate(data)]);
    } catch (error) {
        res.json(['系统错误', []]);
        console.error(error);
    }
});

// --------------------更新--------------------
router.put('/update/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) res.json(['无法获取id', null]);
        const data = eventSchema.partial().parse(req.body);
        res.json([null, update(id, data)]);
    } catch (error) {
        res.json(['系统错误', false]);
        console.error(error);
    }
});

// --------------------删除--------------------
router.delete('/remove/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) res.json(['无法获取id', null]);
        res.json([null, remove(id)]);
    } catch (error) {
        res.json(['系统错误', false]);
        console.error(error);
    }
});

// --------------------写--------------------
router.post('/batchWrite', (req, res) => {
    try {
        const data = eventSchema2.array().parse(req.body);
        res.json([null, batchWrite(data)]);
    } catch (error) {
        res.json(['系统错误', false]);
        console.error(error);
    }
});

export default router;
