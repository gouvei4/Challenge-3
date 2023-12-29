import { Request, Response } from 'express';
import Users from '../types/users.types';
import usersSchema from '../model/users-models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class SignInService {
  public async signin(request: Request, response: Response) {
    try {
      const { email, password } = request.body as Users;
      const isUserExist = await usersSchema.findOne({ email: email });

      if (!isUserExist) {
        response.status(400).json({
          type: 'Validation Error',
          message: 'User not found',
        });
        return;
      }

      const isPasswordExist = await bcrypt.compare(
        password,
        isUserExist?.password,
      );

      if (!isPasswordExist) {
        response.status(400).json({
          type: 'Validation Error',
          message: 'Email or password is incorrect',
        });
        return;
      }

      const token = jwt.sign(
        {
          _id: isUserExist?._id,
          email: isUserExist?.email,
        },
        'token-jwt',
        {
          expiresIn: '20days',
        },
      );
      response.status(200).json({
        firstName: isUserExist?.firstName,
        lastName: isUserExist?.lastName,
        email: isUserExist?.email,
        token: token,
      });
    } catch (error) {
      response.status(500).json({
        type: 'Internal Server Error',
        message: 'Something went wrong',
      });
    }
  }
}

export default new SignInService();
