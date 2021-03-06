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

UserSchema.virtual('kuca', {
  ref: 'Kuca',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('mama', {
  ref: 'Mama',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('posao', {
  ref: 'Posao',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('iptv', {
  ref: 'Iptv',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('kablovska', {
  ref: 'Kablovska',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('mobitel', {
  ref: 'Mobitel',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('smece', {
  ref: 'Smece',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('struja', {
  ref: 'Struja',
  localField: '_id',
  foreignField: 'user',
})
UserSchema.virtual('voda', {
  ref: 'Voda',
  localField: '_id',
  foreignField: 'user',
})

export default mongoose.models.User || mongoose.model('User', UserSchema)
