import { app } from '../app';
import request from 'supertest';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersSchema from '../model/users-model';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Signin Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should authenticate a user and return a token', async () => {
    const userData = {
      email: 'afonsogouveia11@gmail.com',
      password: 'afonso@123',
    };

    const mockUser = {
      _id: 'mockUserId',
      firstName: 'Mock',
      lastName: 'User',
      email: userData.email,
      password: 'hashedPassword',
    };

    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    (jwt.sign as jest.Mock).mockReturnValue('mockToken');

    jest.spyOn(usersSchema, 'findOne').mockResolvedValue(mockUser);

    const response = await request(app)
      .post('/api/v1/users/sign-in')
      .send(userData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe(mockUser.firstName);
    expect(response.body.lastName).toBe(mockUser.lastName);
    expect(response.body.email).toBe(mockUser.email);
    expect(response.body.token).toBe('mockToken');

    expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, mockUser.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { _id: mockUser._id, email: mockUser.email },
      'token-jwt',
      { expiresIn: '20days' }
    );
  });

});
