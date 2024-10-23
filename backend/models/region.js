import mongoose from 'mongoose';

const regionSchema = new mongoose.Schema({ 
    name: String,
    control: String,
    color: String,
    boundaries: [[Number]],
    dateRange: { from: Date, to: Date },
})

export const Region = mongoose.model('Region', regionSchema);