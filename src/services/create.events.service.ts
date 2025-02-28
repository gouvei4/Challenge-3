import { Request, Response } from 'express';
import Events from '../types/events.type';
import Event from '../model/events.model';
import jwt from 'jsonwebtoken';
import { TTokenDecoded } from '../types/tokens-decoded.types';
import { NOT_AUTHENTICATED, SERVER_ERROR, UNAUTHORIZED, WRONG } from '../utils/error';
import {eventsValidationSchema} from '../utils/Validation';
import { ValidationError } from 'yup';

class EventService {
  public async create(request: Request, response: Response) {
    try {
      const { description, dayOfWeek } = request.body as Events;
      const authorizationHeader = request.headers.authorization;

      try {
        await eventsValidationSchema.validate(request.body, {
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

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          error: UNAUTHORIZED,
          message: `${NOT_AUTHENTICATED} Access token is missing`,
        });
        return;
      }

      const token = authorizationHeader.split(' ')[1];

      const tokenDecoded = jwt.decode(token) as TTokenDecoded;

      const newEvent = await Event.create({
        description,
        dayOfWeek,
        userId: tokenDecoded?._id,
      });

      response.status(200).json(newEvent);
    } catch (error: any) {
      response.status(500).json({
        success: false,
        error: SERVER_ERROR,
        message: WRONG,
      });
    }
  }
}

export default new EventService();
