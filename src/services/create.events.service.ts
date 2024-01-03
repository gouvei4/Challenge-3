import { Request, Response } from 'express';
import Events from '../types/events.type';
import Event from '../model/events.model';
import jwt from 'jsonwebtoken';
import { TTokenDecoded } from '../types/tokens-decoded.types';

class EventService {
  public async create(request: Request, response: Response) {
    try {
      const { description, dayOfWeek } = request.body as Events;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: 'Access token is missing',
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

      response.status(201).json(newEvent);
    } catch (error: any) {
      response.status(500).json({
        success: false,
        message: error.message.toString(),
      });
    }
  }
}

export default new EventService();
