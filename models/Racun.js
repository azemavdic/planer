import mongoose from 'mongoose'

const RacunSchema = new mongoose.Schema(
  {
    naziv: {
      type: String,
      required: [true, 'Molimo upišite naziv troska'],
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

export default mongoose.models.Racun || mongoose.model('Racun', RacunSchema)
