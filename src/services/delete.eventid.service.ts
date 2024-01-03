import { Request, Response } from 'express';
import Event from '../model/events.model';

class DeleteEventId {
  public async deleteEventId(request: Request, response: Response) {
    try {
      const eventId = request.params.id;

      const authorizationHeader = request.headers.authorization;

      if (!authorizationHeader) {
        response.status(401).json({
          success: false,
          message: 'Access token is missing',
        });
        return;
      }

      const event = await Event.findByIdAndDelete(eventId);

      if (event) {
        response.status(200).json({ message: 'Event deleted successfully' });
      } else {
        response.status(404).json({ message: 'Event not found.' });
      }
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: 'Internal server error.' });
    }
  }
}

export default new DeleteEventId();
