import express from 'express';
import { Event } from '../models/event.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const { year } = req.query;

    const parsedYear = parseInt(year); 

    if (isNaN(parsedYear)) {
        return res.status(400).json({ error: 'Invalid year' });
    }

    try {
        const events = await Event.find({
            date: { $gte: new Date(`${parsedYear}-01-01`), $lt: new Date(`${parsedYear + 1}`)}
        });
        console.log(events)
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching events' });
    }
})

export default router;