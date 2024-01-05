import { Request, Response } from 'express';
import Users from '../types/users.types';
import usersSchema from '../model/users-model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ERROR_VALIDATION, SERVER_ERROR, WRONG } from '../utils/error';

class SignInService {
  public async signin(request: Request, response: Response) {
    try {
      const { email, password } = request.body as Users;
      const isUserExist = await usersSchema.findOne({ email: email });

      if (!isUserExist) {
        response.status(400).json({
          type: ERROR_VALIDATION,
          resource: 'Email',
          message: 'Invalid email',
        });
        return;
      }

      const isPasswordExist = await bcrypt.compare(
        password,
        isUserExist?.password,
      );

      if (!isPasswordExist) {
        response.status(400).json({
          type: ERROR_VALIDATION,
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
        type: SERVER_ERROR,
        message: WRONG,
      });
    }
  }
}

export default new SignInService();
