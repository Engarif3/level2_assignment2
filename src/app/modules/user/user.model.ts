import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TUser, UserStaticModel } from './user.interface';

const fullNameSchema = new Schema<TFullName>({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
});

const addressSchema = new Schema<TAddress>({
  street: { type: String, required: [true, 'Street name is required'] },
  city: { type: String, required: [true, 'City name is required'] },
  country: { type: String, required: [true, 'Country name is required'] },
});

const userSchema = new Schema<TUser, UserStaticModel>({
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

// creating a custom static method
userSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await UserModel.findOne({ userId: id });
  return existingUser;
};

export const UserModel = model<TUser, UserStaticModel>('user', userSchema);
