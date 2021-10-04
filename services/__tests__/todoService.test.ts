import { expect, jest } from '@jest/globals';
import { addTodoItem, updateTodoItem, deleteTodoItem } from '../todoService';
const xCsrf = 'some-long-token';
describe('updateTodoItem', () => {
  it('should return no data after', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              slug: 'some-title',
              todoTitle: 'Some Title',
              todoDueDate: '27/09/2021',
              todoStatus: 'unfinished',
            },
          ]),
      })
    );

    expect(
      await updateTodoItem(
        {
          slug: 'some-title',
          todoTitle: 'Some Title',
          todoDueDate: '27/09/2021',
          todoStatus: 'unfinished',
        },
        xCsrf
      )
    ).toEqual({
      data: [
        {
          slug: 'some-title',
          todoTitle: 'Some Title',
          todoDueDate: '27/09/2021',
          todoStatus: 'unfinished',
        },
      ],
    });
  });
});

describe('deleteTodoItem', () => {
  it('should return no data after', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    expect(await deleteTodoItem('some-title', xCsrf)).toEqual({
      data: [],
    });
  });
});

describe('addTodoItem', () => {
  it('should return no data after', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              slug: 'some-title',
              todoTitle: 'Some Title',
              todoDueDate: '27/09/2021',
              todoStatus: 'unfinished',
            },
          ]),
      })
    );

    expect(
      await addTodoItem(
        {
          slug: 'some-title',
          todoTitle: 'Some Title',
          todoDueDate: '27/09/2021',
          todoStatus: 'unfinished',
        },
        xCsrf
      )
    ).toEqual({
      data: [
        {
          slug: 'some-title',
          todoTitle: 'Some Title',
          todoDueDate: '27/09/2021',
          todoStatus: 'unfinished',
        },
      ],
    });
  });
});
