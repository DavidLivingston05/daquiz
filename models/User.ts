import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  phone: string;
  age: number;
  totalScore: number;
  quizzesTaken: number;
  practiceCount: number;
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    totalScore: {
      type: Number,
      default: 0,
      index: true,
    },
    quizzesTaken: {
      type: Number,
      default: 0,
    },
    practiceCount: {
      type: Number,
      default: 0,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ totalScore: -1 });

export const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
