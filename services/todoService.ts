import TodoType from '../types/todo';

const getHeaders = () => {
  return { 'Content-Type': 'application/json' };
};

export const addTodoItem = async (
  todo: TodoType,
  xCsrf: string
): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { ...getHeaders(), 'X-CSRF-TOKEN': xCsrf },
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

export const updateTodoItem = async (
  todo: TodoType,
  xCsrf: string
): Promise<any> => {
  const requestOptions = {
    method: 'PUT',
    headers: { ...getHeaders(), 'X-CSRF-TOKEN': xCsrf },
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

export const deleteTodoItem = async (
  slug: string,
  xCsrf: string
): Promise<any> => {
  const requestOptions = {
    method: 'DELETE',
    headers: { ...getHeaders(), 'X-CSRF-TOKEN': xCsrf },
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
