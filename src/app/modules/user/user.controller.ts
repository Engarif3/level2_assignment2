import { Request, Response } from 'express';
import { UserServices } from './user.service';

// create user route
const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userData } = req.body;
    const result = await UserServices.createUserIntoDB(userData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(200).json({
      success: false,
      message: 'User not created',
      error: {
        code: 400,
        description: 'User not created!',
      },
    });
  }
};

// get all users route
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

export const UserControllers = {
  createUser,
  getAllUsers,
};
