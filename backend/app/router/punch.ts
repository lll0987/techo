import express from 'express';
import { z } from 'zod';
import { punchFilterSchema, punchSchema, punchSortSchema, usePunchService } from '../../database/punch';

const router = express.Router();
const { list, create, batchCreate, update, remove, getMaxByTitle } = usePunchService();

// --------------------列表--------------------
router.post('/list', (req, res) => {
    try {
        const { filter, sort } = z
            .object({
                filter: punchSchema.partial().optional(),
                sort: punchSortSchema.optional()
            })
            .parse(req.body);
        res.json([null, list(filter, sort)]);
    } catch (error) {
        res.json(['系统错误', []]);
        console.error(error);
    }
});
router.post('/getMaxByTitle', (req, res) => {
    try {
        const filter = punchFilterSchema.parse(req.body);
        res.json([null, getMaxByTitle(filter)]);
    } catch (error) {
        res.json(['系统错误', []]);
        console.error(error);
    }
});

// --------------------创建--------------------
router.post('/create', (req, res) => {
    try {
        const data = punchSchema.parse(req.body);
        res.json([null, create(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});
router.post('/batchCreate', (req, res) => {
    try {
        const data = punchSchema.array().parse(req.body);
        res.json([null, batchCreate(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});

// --------------------更新--------------------
router.put('/update/:id', (req, res) => {
    try {
        const id = Number(req.params.id);
        if (isNaN(id)) res.json(['无法获取id', null]);
        const data = punchSchema.partial().parse(req.body);
        res.json([null, update(id, data)]);
    } catch (error) {
        res.json(['系统错误', null]);
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
        res.json(['系统错误', null]);
        console.error(error);
    }
});

export default router;
