import mongoose from 'mongoose'

const SmeceSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      default: 'Smece',
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

export default mongoose.models.Smece || mongoose.model('Smece', SmeceSchema)
