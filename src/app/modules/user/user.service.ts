import { UserModel } from './user.model';
import { TUser } from './user.interface';

//create user
const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

// get all users
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// get single user
const getSingleUserFromDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id });
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

// update user
const updateUserInDB = async (id: string, updatedUserData: TUser) => {
  const result = await UserModel.findOneAndUpdate(
    { userId: id },
    { $set: updatedUserData },
    { new: true },
  );

  if (!result) {
    throw new Error('User not found');
  }

  return result;
};

// delete user

const deleteUserFromDB = async (id: string) => {
  const result = await UserModel.findOneAndDelete({ userId: id });
  if (!result) {
    throw new Error('User not found');
  }
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
