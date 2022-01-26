import mongoose from 'mongoose'

const StrujaSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      default: 'Struja',
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

export default mongoose.models.Struja || mongoose.model('Struja', StrujaSchema)
