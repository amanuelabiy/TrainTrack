import { User } from "@/types/user";
import { productionUrl } from "./workout_api";
import { fetchData } from "./workout_api";

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(`${productionUrl}/users`, { method: "GET" });
  return response;
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(`${productionUrl}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function login(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(`${productionUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (response) {
    return response;
  } else {
    throw new Error("No response from server");
  }
}

export async function logout() {
  await fetchData(`${productionUrl}/users/logout`, { method: "POST" });
}
