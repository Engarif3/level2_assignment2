import { UserModel } from './user.model';
import { TUser } from './user.interface';

//create a user query
const createUserIntoDB = async (userData: TUser) => {
  //static method
  if (await UserModel.isUserExists(userData.userId)) {
    throw new Error('User alrday exists');
  }
  const result = await UserModel.create(userData);

  return result;
};

// get all users query
const getAllUsersFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

// get single user query
const getSingleUserFromDB = async (id: number) => {
  if (await UserModel.isUserExists(id)) {
    const result = await UserModel.findOne({ userId: id });
    return result;
  } else {
    throw new Error('User does not exist');
  }
};

// update user query
const updateUserInDB = async (id: number, updatedUserData: TUser) => {
  if (await UserModel.isUserExists(id)) {
    const result = await UserModel.findOneAndUpdate(
      { userId: id },
      { $set: updatedUserData },
      { new: true },
    );
    return result;
  } else {
    throw new Error('User does not exist');
  }
};

// delete a user query

const deleteUserFromDB = async (id: number) => {
  if (await UserModel.isUserExists(id)) {
    const result = await UserModel.findOneAndDelete({ userId: id });
    return result;
  } else {
    throw new Error('User does not exist');
  }
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateUserInDB,
  deleteUserFromDB,
};
