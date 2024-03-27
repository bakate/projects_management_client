import { fetcher } from "@/lib/utils";
import {
  LoginType,
  SignUpType,
  authenticatedUserSchema,
} from "@/schemas/auth.schema";

export const loginUserAction = async (data: LoginType) => {
  const res = await fetcher(
    import.meta.env.VITE_API_ENDPOINT + "local-auth/login",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const validateResponse = authenticatedUserSchema.safeParse(res);
  if (!validateResponse.success) {
    return {
      error: res.error,
      message: res.message,
      statusCode: res.statusCode,
    } as const;
  }

  // store token in local storage
  if (res.token) {
    const setNewDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    localStorage.setItem(
      "newUser",
      JSON.stringify({
        userId: res.userId,
        token: res.token,
        username: res.username,
        expiration: setNewDate.toISOString(),
      })
    );
  }

  return {
    token: res.token,
  } as const;
};

export const signUpUserAction = async (data: SignUpType) => {
  const res = await fetcher(
    import.meta.env.VITE_API_ENDPOINT + "local-auth/signup",
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );

  const validateResponse = authenticatedUserSchema.safeParse(res);
  if (!validateResponse.success) {
    return {
      error: res.error,
      message: res.message,
      statusCode: res.statusCode,
    } as const;
  }

  // store token in local storage
  if (res.token) {
    localStorage.setItem("userToken", res.token);
  }

  return {
    token: res.token,
  } as const;
};

export const logoutUserAction = () => {
  localStorage.removeItem("newUser");
};

export const isUserAuthenticated = () => {
  const user = localStorage.getItem("newUser");
  if (!user) {
    return false;
  }

  const { expiration, token } = JSON.parse(user);
  if (token && new Date(expiration) > new Date()) {
    return true;
  }

  return false;
};

export const getAuthenticatedUser = () => {
  const user = localStorage.getItem("newUser");
  if (!user) {
    return null;
  }

  const parsedUser = authenticatedUserSchema.parse(JSON.parse(user));

  return {
    token: parsedUser.token,
    userId: parsedUser.userId,
    username: parsedUser.username,
  } as const;
};
