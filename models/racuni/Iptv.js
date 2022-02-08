import mongoose from 'mongoose'

const IptvSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    naziv: {
      type: String,
      default: 'Iptv',
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

export default mongoose.models.Iptv || mongoose.model('Iptv', IptvSchema)
