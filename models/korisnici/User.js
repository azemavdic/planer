import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = Schema(
  {
    name: { type: String, required: [true, 'Upišite ime'] },
    email: { type: String, required: [true, 'Upišite email'] },
    password: {
      type: String,
      required: [true, 'Upišite šifru'],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.User || mongoose.model('User', UserSchema)
