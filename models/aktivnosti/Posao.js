import mongoose from 'mongoose'

const PosaoSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
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
)

export default mongoose.models.Posao || mongoose.model('Posao', PosaoSchema)
