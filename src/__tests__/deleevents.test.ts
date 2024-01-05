import request from 'supertest';
import Event from '../model/events.model';
import { app } from '../app';
import { NOT_AUTHENTICATED, UNAUTHORIZED } from '../utils/error';

jest.mock('../model/events.model', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('DELETE /api/v1/events', () => {
  it('must delete the event successfully', async () => {
    const mockEvent = { _id: 'eventId', title: 'Evento Teste' };

    (Event.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(mockEvent);

    const response = await request(app)
      .delete('/api/v1/events/:id')
      .set('Authorization', 'seuTokenDeAutorizacao');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Event deleted successfully' });
  });

  it('should return 404 if the event is not found', async () => {
    (Event.findByIdAndDelete as jest.Mock).mockResolvedValueOnce(null);

    const response = await request(app)
      .delete('/api/v1/events/:id')
      .set('Authorization', 'seuTokenDeAutorizacao');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Event not found.' });
  });

  it('should return 401 if authorization token is missing', async () => {
    const response = await request(app).delete('/api/v1/events');

    expect(response.status).toBe(401);
    expect(response.body).toEqual({
      success: false,
      error: UNAUTHORIZED,
      message: `${NOT_AUTHENTICATED} Access token is missing`,
    });
  });

  it('should return 500 in case of internal server error', async () => {
    (Event.findByIdAndDelete as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('Erro interno')));

    const response = await request(app)
      .delete('/api/v1/events/:id')
      .set('Authorization', 'seuTokenDeAutorizacao');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Internal server error.' });
  });
});
