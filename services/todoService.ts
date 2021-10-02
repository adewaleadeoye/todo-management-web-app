import TodoType from '../types/todo';

const getHeaders = () => {
  return { 'Content-Type': 'application/json' };
};

export const addTodoItem = async (
  todo: TodoType,
  csrfToken: string
): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'XSRF-TOKEN': csrfToken },
    body: JSON.stringify({ todo: { ...todo } }),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/todo`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    const data = await response.json();
    return { data };
  } catch (err) {
    return { err };
  }
};

export const updateTodoItem = async (todo: TodoType): Promise<any> => {
  const requestOptions = {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ todo: { ...todo } }),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/todo/${todo.slug}`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();
    return { data };
  } catch (err) {
    return { err };
  }
};

export const deleteTodoItem = async (slug: string): Promise<any> => {
  const requestOptions = {
    method: 'DELETE',
    headers: getHeaders(),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/todo/${slug}`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }

    const data = await response.json();
    return { data };
  } catch (err) {
    return { err };
  }
};
