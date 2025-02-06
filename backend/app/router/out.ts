import express from 'express';
import { z } from 'zod';
import { outEventSchema, outSchema, outSortSchema, useOutService } from '../../database/out';

const router = express.Router();
const { list, create, batchCreate, update, remove, createOutEvent } = useOutService();

// --------------------列表--------------------
router.post('/list', (req, res) => {
    try {
        const { filter, sort } = z
            .object({
                filter: outSchema.partial().optional(),
                sort: outSortSchema.optional()
            })
            .parse(req.body);
        res.json([null, list(filter, sort)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});

// --------------------创建--------------------
router.post('/create', (req, res) => {
    try {
        const data = outSchema.parse(req.body);
        res.json([null, create(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});
router.post('/batchCreate', (req, res) => {
    try {
        const data = outSchema.array().parse(req.body);
        res.json([null, batchCreate(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});
router.post('/createOutEvent', (req, res) => {
    try {
        const data = outEventSchema.parse(req.body);
        res.json([null, createOutEvent(data)]);
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
        const data = outSchema.partial().parse(req.body);
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
