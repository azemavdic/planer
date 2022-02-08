import mongoose from 'mongoose'

const VodaSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    naziv: {
      type: String,
      default: 'Voda',
    },
    iznos: {
      type: Number,
      required: [true, 'Molimo upišite iznos računa'],
    },
    mjesec: {
      type: String,
      required: [true, 'Molimo upišite mjesec računa'],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Voda || mongoose.model('Voda', VodaSchema)
