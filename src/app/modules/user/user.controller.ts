import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';

// create user
const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    // creating a schema validation using zod
    const zodParseData = userValidationSchema.parse(userData);

    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'No user found',
      error: {
        code: 400,
        description: 'no user created',
      },
    });
  }
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserServices.getSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// update user
// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;
//     const updatedUserData = req.body;

//     const result = await UserServices.updateUserInDB(
//       parseInt(userId),
//       updatedUserData,
//     );

//     res.status(200).json({
//       success: true,
//       message: 'User updated successfully!',
//       data: result,
//     });
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     res.status(404).json({
//       success: false,
//       message: err.message || 'something went wrong',
//       error: err,
//     });
//   }
// };

// update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const updatedUserData = req.body;

    try {
      const zodParseData = userValidationSchema.parse(updatedUserData);
      const result = await UserServices.updateUserInDB(
        parseInt(userId),
        zodParseData,
      );

      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: 'Validation error during update',
        error: err,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await UserServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: 'User not found!',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  }
};
export const UserControllers = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
