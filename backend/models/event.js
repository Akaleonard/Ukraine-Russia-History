import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({ 
   location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number],
   },
   title: String,
   description: String,
   date: Date,
   imageUrl: String, 
});

export const Event = mongoose.model('Event', eventSchema);