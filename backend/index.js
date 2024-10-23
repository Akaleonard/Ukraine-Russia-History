import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import eventRoutes from './routes/events.js';
import regionRoutes from './routes/regions.js';

dotenv.config();

const app = express();

connectDB();

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET', 
    credentials: true,
  };

app.use(cors(corsOptions));

const port = process.env.PORT || 8000;

app.get('/api/map-token', async (req, res) => {
    res.json({ token: process.env.MAPBOX_ACCESS_TOKEN })
})

app.use('/api/events', eventRoutes);
app.use('/api/regions', regionRoutes);

app.listen(port, () => console.log(`***Listening on port ${port}***`));