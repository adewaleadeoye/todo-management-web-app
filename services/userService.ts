import UserType from '../types/user';

type UserParams = {
  email: string;
  password: string;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<any> => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  };

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/auth/login`,
      requestOptions
    );

    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
    return await response.json();
  } catch (err) {
    return err;
  }
};

export const logoutUser = async () => {
  await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/auth/logout`);
};
