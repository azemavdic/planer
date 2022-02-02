import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = Schema(
  {
    ime: { type: String, required: [true, 'Upišite ime'] },
    email: { type: String, required: [true, 'Upišite email'] },
    sifra: {
      type: String,
      required: [true, 'Upišite šifru'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

UserSchema.virtual('mama', {
  ref: 'Mama',
  localField: '_id',
  foreignField: 'user',
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
