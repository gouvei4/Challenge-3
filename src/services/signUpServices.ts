import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Users from '../types/users.types';
import usersSchema from '../model/users-models';

class SignUpServices {
  public async signUp(request: Request, response: Response) {
    try {
      const payload = request.body as Users;
      const hashedPassword = await bcrypt.hash(payload.password, 10);
      const hashedConfirmPassword = await bcrypt.hash(payload.confirmPassword, 10);

      const newUser = await usersSchema.create({
        ...payload,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword
      });
      response.status(200).json({
        status: 201,
        success: true,
        message: 'user created Successfuly',
        user: newUser
      });
    } catch (err: any) {
      response.status(400).json({
        status: 400,
        message: err.message.toString(),
      });
    }
  }
}

export default new SignUpServices();
