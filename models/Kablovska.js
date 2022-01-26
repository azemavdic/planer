import mongoose from 'mongoose'

const KablovskaSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      default: 'Kablovska',
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

export default mongoose.models.Kablovska ||
  mongoose.model('Kablovska', KablovskaSchema)
