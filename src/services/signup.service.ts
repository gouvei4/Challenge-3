import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Users from '../types/users.types';
import usersSchema from '../model/users-model';

class SignUpService {
  public async signUp(request: Request, response: Response) {
    try {
      const payload = request.body as Users;
      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const newUser = await usersSchema.create({
        ...payload,
        password: hashedPassword,
        confirmPassword: hashedPassword
      });
      response.status(201).json({
        status: 201,
        success: true,
        message: 'user created Successfuly',
        user: newUser
      });
    } catch (error) {
      response.status(500).json({
        type: 'Internal Server Error',
        message: 'Something went wrong',
      });
    }
  }
}

export default new SignUpService();
