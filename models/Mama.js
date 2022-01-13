import mongoose from 'mongoose';

const MamaSchema = new mongoose.Schema(
    {
        naziv: {
            type: String,
            required: [true, 'Molimo upišite naziv aktivnosti'],
        },
        opis: {
            type: String,
            required: [true, 'Molimo upišite opis aktivnosti'],
        },
        zavrsen: {
            type: Boolean,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Mama || mongoose.model('Mama', MamaSchema);
