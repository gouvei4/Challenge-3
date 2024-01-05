import request from 'supertest';
import { app } from '../app';
import Event from '../model/events.model';
import { NOT_AUTHENTICATED, SERVER_ERROR, UNAUTHORIZED, WRONG } from '../utils/error';

jest.mock('../model/events.model', () => ({
  findById: jest.fn(),
}));

describe('GetEventId Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should get an event by ID with a valid token', async () => {
    const mockToken = 'mockToken';
    const mockEventId = 'mockEventId';
    const mockEvent = {
      _id: mockEventId,
      dayOfWeek: 'Mock Event',
      description: 'This is a mock event',
    };

    (Event.findById as jest.Mock).mockResolvedValue(mockEvent);

    const response = await request(app)
      .get(`/api/v1/events/${mockEventId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.event).toEqual(mockEvent);

    expect(Event.findById).toHaveBeenCalledWith(mockEventId);
  });

  it('should return 404 for a non-existing event', async () => {
    const mockToken = 'mockToken';
    const nonExistingEventId = 'nonExistingEventId';

    (Event.findById as jest.Mock).mockResolvedValue(null);

    const response = await request(app)
      .get(`/api/v1/events/${nonExistingEventId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Event not found');

    expect(Event.findById).toHaveBeenCalledWith(nonExistingEventId);
  });

  it('should return 401 for missing authorization header', async () => {
    const mockEventId = 'mockEventId';

    const response = await request(app)
      .get(`/api/v1/events/${mockEventId}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(UNAUTHORIZED);
    expect(response.body.message).toBe(`${NOT_AUTHENTICATED} Access token is missing`);

    expect(Event.findById).not.toHaveBeenCalled();
  });

  it('should handle internal server errors', async () => {
    const mockToken = 'mockToken';
    const mockEventId = 'mockEventId';

    (Event.findById as jest.Mock).mockRejectedValue(new Error(SERVER_ERROR));

    const response = await request(app)
      .get(`/api/v1/events/${mockEventId}`)
      .set('Authorization', `Bearer ${mockToken}`)
      .set('Accept', 'application/json');

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(WRONG);

    expect(Event.findById).toHaveBeenCalledWith(mockEventId);
  });
});
