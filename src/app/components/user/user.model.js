import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },
    emailConfirmed: {
      type: Boolean,
      default: false,
      required: true,
      select: false
    }
  },
  { versionKey: false }
);

async function cryptPass(next) {
  if (this.isModified('password')) {
    try {
      const hash = await bcrypt.hash(this.password, 10);
      this.password = hash;
    } catch (err) {
      return next(err);
    }
  }
  return next();
}

UserSchema.pre('save', cryptPass);

export default model('User', UserSchema);
