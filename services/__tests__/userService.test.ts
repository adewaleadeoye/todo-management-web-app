import { expect, jest } from '@jest/globals';
import { loginUser } from '../userService';

describe('loginUser', () => {
  it('should return data on login', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ data: 'data' }),
      })
    );

    // global.console.error = jest.fn();
    expect(await loginUser('some@email.com', 'somepassword')).toEqual({
      data: 'data',
    });
  });
  it('should throw an error ', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () =>
          Promise.resolve({
            error: 'Incorrect details',
          }),
      })
    );

    global.console.error = jest.fn(); // silence console error in test files
    expect(await loginUser('some@email.com', 'wrongpassword')).toEqual({
      error: 'Incorrect details',
    });
  });
});
