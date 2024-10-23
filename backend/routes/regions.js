import express from 'express';
import { Region } from '../models/region.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const regions = await Region.find();
        res.json(regions);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching regions' });
    }
})

export default router;