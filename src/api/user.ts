import { IUser } from "../interfaces";
const resource: string = "/users/";

export async function getUsers() {
  return fetch(resource)
    .then(async (response: Response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        const error = await response.text();
        throw new Error(error);
      }
    })
    .catch((error: Error) => {
      throw error;
    });
}

export async function getUserById(userId: number) {
  return fetch(`${resource}${userId}`)
    .then(async (response: Response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        const error = await response.text();
        throw new Error(error);
      }
    })
    .catch((error: Error) => {
      throw error;
    });
}

export function saveUser(user: IUser) {
  return fetch(resource + (user.id || ""), {
    method: user.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(user),
  })
    .then(async (response: Response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        const error = await response.text();
        throw new Error(error);
      }
    })
    .catch((error: Error) => {
      throw error;
    });
}

export function deleteUser(userID: number) {
  return fetch(resource + userID, { method: "DELETE" })
    .then(async (response: Response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 400) {
        const error = await response.text();
        throw new Error(error);
      }
    })
    .catch((error: Error) => {
      throw error;
    });
}
