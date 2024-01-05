import { app } from '../app';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import Event from '../model/events.model';

jest.mock('../model/events.model', () => ({
  findByIdAndDelete: jest.fn(),
}));

describe('DeleteEventId Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should delete an event by ID with a valid token', async () => {
    const mockToken = 'mockToken';
    const mockEventId = 'mockEventId';
    const mockDecodedUser = {
      _id: 'mockUserId',
    };

    jest.spyOn(jwt, 'decode').mockReturnValue(mockDecodedUser);

    (Event as any).findByIdAndDelete = jest.fn().mockResolvedValue({ _id: mockEventId });

    const response = await request(app)
      .delete(`/api/v1/events/${mockEventId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Event deleted successfully');

    expect((Event as any).findByIdAndDelete).toHaveBeenCalledWith(mockEventId);
  });

  it('Should return 404 for a non-existing event', async () => {
    const mockToken = 'mockToken';
    const nonExistingEventId = 'nonExistingEventId';
    const mockDecodedUser = {
      _id: 'mockUserId',
    };

    jest.spyOn(jwt, 'decode').mockReturnValue(mockDecodedUser);

    (Event as any).findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const response = await request(app)
      .delete(`/api/v1/events/${nonExistingEventId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Event not found.');

    expect((Event as any).findByIdAndDelete).toHaveBeenCalledWith(nonExistingEventId);
  });
});
