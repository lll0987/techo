import express from 'express';
import { z } from 'zod';
import { intoEventSchema, intoSchema, intoSortSchema, useIntoService } from '../../database/into';

const router = express.Router();
const { list, create, batchCreate, update, remove, createIntoEvent } = useIntoService();

// --------------------列表--------------------
router.post('/list', (req, res) => {
    try {
        const { filter, sort } = z
            .object({
                filter: intoSchema.partial().optional(),
                sort: intoSortSchema.optional()
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
        const data = intoSchema.parse(req.body);
        res.json([null, create(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});
router.post('/batchCreate', (req, res) => {
    try {
        const data = intoSchema.array().parse(req.body);
        res.json([null, batchCreate(data)]);
    } catch (error) {
        res.json(['系统错误', null]);
        console.error(error);
    }
});
router.post('/createIntoEvent', (req, res) => {
    try {
        const data = intoEventSchema.parse(req.body);
        res.json([null, createIntoEvent(data)]);
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
        const data = intoSchema.partial().parse(req.body);
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
