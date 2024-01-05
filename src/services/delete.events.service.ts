import { Request, Response } from 'express';
import Event from '../model/events.model';
import {
  NOT_AUTHENTICATED,
  SERVER_ERROR,
  UNAUTHORIZED,
  WRONG,
} from '../utils/error';

class DeleteEventDay {
  public async delete(request: Request, response: Response) {
    try {
      const searchDay = request.query.dayOfWeek;
      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          error: UNAUTHORIZED,
          message: `${NOT_AUTHENTICATED} Access token is missing`,
        });
        return;
      }
      if (!searchDay) {
        return response
          .status(400)
          .json({ message: 'Missing dayOfWeek parameter' });
      }

      const eventsToDelete = await Event.find({ dayOfWeek: searchDay });

      if (eventsToDelete.length === 0) {
        return response
          .status(404)
          .json({ message: 'No events found for the specified dayOfWeek' });
      }

      await Event.deleteMany({ dayOfWeek: searchDay });

      response.status(200).json({ message: 'Events deleted successfully' });
    } catch (err) {
      console.error(err);
      response.status(500).json({ error: SERVER_ERROR, message: WRONG });
    }
  }
}

export default new DeleteEventDay();
