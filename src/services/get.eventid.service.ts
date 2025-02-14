import { Request, Response } from 'express';
import Event from '../model/events.model';
import { NOT_AUTHENTICATED, SERVER_ERROR, UNAUTHORIZED, WRONG } from '../utils/error';

class GetEventId {
  public async getEventId(request: Request, response: Response) {
    try {
      const eventId = request.params.id;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        return response.status(401).json({
          success: false,
          error: UNAUTHORIZED,
          message: `${NOT_AUTHENTICATED} Access token is missing`,
        });
      }
      const event = await Event.findById(eventId);

      if (!event) {
        return response.status(404).json({
          success: false,
          message: 'Event not found',
        });
      }

      return response.status(200).json({ event });
    } catch (error: any) {
      return response.status(500).json({
        success: false,
        error: SERVER_ERROR,
        message: WRONG,
      });
    }
  }
}

export default new GetEventId();
