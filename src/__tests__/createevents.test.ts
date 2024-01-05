import { Request, Response } from 'express';
import EventService from '../services/create.events.service';
import Event from '../model/events.model';
import jwt from 'jsonwebtoken';


jest.mock('../model/events.model');
jest.mock('jsonwebtoken');

describe('EventService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new event successfully', async () => {
      const requestMock: Partial<Request> = {
        body: {
          description: 'Sample Event',
          dayOfWeek: 'Monday',
        },
        headers: {
          authorization: 'Bearer sampleAccessToken',
        },
      };

      const responseMock: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const tokenDecodedMock = { _id: 'sampleUserId' };

      jwt.decode = jest.fn().mockReturnValue(tokenDecodedMock);
      Event.create = jest.fn().mockResolvedValueOnce({ _id: 'sampleEventId' });

      await EventService.create(requestMock as Request, responseMock as Response);

      expect(responseMock.status).toHaveBeenCalledWith(200);
      expect(responseMock.json).toHaveBeenCalledWith({ _id: 'sampleEventId' });
    });

  });
});
