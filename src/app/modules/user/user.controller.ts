import { Request, Response } from 'express';
import { UserServices } from './user.service';
// import { StudentServices } from './student.service';

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

export const UserControllers = {
  createUser,
};
