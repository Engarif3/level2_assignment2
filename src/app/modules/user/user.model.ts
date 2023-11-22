import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const userNameSchema = new Schema<TUser>({
  userId: { type: Number, required: [true, 'user id is required'] },
  username: { type: String },
});

export const UserModel = model<TUser>('user', userNameSchema);
