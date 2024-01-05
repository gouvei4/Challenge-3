import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import Event from '../model/events.model';

jest.mock('../model/events.model', () => ({
  find: jest.fn(),
}));

describe('GetEventsByDay Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should get events for a specific day with a valid token', async () => {
    const mockToken = 'mockToken';
    const mockDayOfWeek = 'Monday';
    const mockDecodedUser = {
      _id: 'mockUserId',
    };

    jest.spyOn(jwt, 'decode').mockReturnValue(mockDecodedUser);

    (Event as any).find = jest.fn().mockResolvedValue([{ _id: 'mockEventId', dayOfWeek: mockDayOfWeek }]);

    const response = await request(app)
      .get('/api/v1/events')
      .query({ dayOfWeek: mockDayOfWeek })
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.events).toBeDefined();
    expect(response.body.events.length).toBe(1);
    expect(response.body.events[0].dayOfWeek).toBe(mockDayOfWeek);

    expect((Event as any).find).toHaveBeenCalledWith({ dayOfWeek: mockDayOfWeek });
  });

  it('Should return 404 for missing dayOfWeek parameter with valid token', async () => {
    const mockToken = 'mockToken';
    const mockDecodedUser = {
      _id: 'mockUserId',
    };

    jest.spyOn(jwt, 'decode').mockReturnValue(mockDecodedUser);

    const response = await request(app)
      .get('/api/v1/events')
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  it('Should return 401 for missing authorization header', async () => {
    const response = await request(app)
      .get('/api/v1/events')
      .query({ dayOfWeek: 'Monday' });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Not Authenticated. Access token is missing');
  });
});
