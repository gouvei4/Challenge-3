import { Request, Response } from 'express';
import { format, parse, isValid } from 'date-fns';
import bcrypt from 'bcrypt';
import Users from '../types/users.types';
import usersSchema from '../model/users-model';
import { SERVER_ERROR, WRONG } from '../utils/error';
import { createValidationSchema } from '../utils/Validation';
import { ValidationError } from 'yup';

class SignUpService {
  public async signUp(request: Request, response: Response) {
    try {
      if (typeof request.body.birthDate === 'string') {
        const parsedDate = parse(
          request.body.birthDate,
          'dd/MM/yyyy',
          new Date(),
        );

        if (!isValid(parsedDate)) {
          return response.status(404).json({ error: 'Invalid date format' });
        }

        request.body.birthDate = format(parsedDate, 'dd/MM/yyyy');
      }

      try {
        await createValidationSchema.validate(request.body, {
          stripUnknown: true,
        });
      } catch (error) {
        if (error instanceof ValidationError) {
          const details = error.errors;
          return response
            .status(404)
            .json({ error: 'Validation error', details });
        } else {
          return response.status(404).json({ error: 'Validation error' });
        }
      }

      const payload = request.body as Users;
      const hashedPassword = await bcrypt.hash(payload.password, 10);

      const newUser = await usersSchema.create({
        ...payload,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      });
      response.status(201).json({
        status: 201,
        success: true,
        message: 'user created Successfuly',
        user: newUser,
      });
    } catch (error) {
      response.status(500).json({
        type: SERVER_ERROR,
        message: WRONG,
      });
    }
  }
}

export default new SignUpService();
