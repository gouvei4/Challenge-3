import { Request, Response } from 'express';
import Event from '../model/events.model';

class GetEvents {
  public async getEvents(request: Request, response: Response) {
    try {
      const searchDay = request.query.dayOfWeek;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: 'Not Authenticated. Access token is missing',
        });
        return;
      }

      if (!searchDay) {
        return response.status(404).json({
          error: 'Not Found',
          message: 'Not found',
        });
      }

      const events = await Event.find({ dayOfWeek: searchDay });
      return response.status(200).json({ events: events });
    } catch (error: any) {
      response.status(500).json({
        success: false,
        message: error.message.toString(),
      });
    }
  }
}

export default new GetEvents();
