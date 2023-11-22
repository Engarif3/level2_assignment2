import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street name is required'] },
  city: { type: String, required: [true, 'City name is required'] },
  country: { type: String, required: [true, 'Country name is required'] },
});

const userNameSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User id is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'User name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobby is required'],
  },
  address: addressSchema,
});

export const UserModel = model<TUser>('user', userNameSchema);
