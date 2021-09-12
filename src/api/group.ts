import { IGroup } from "../interfaces";
const resource: string = "/groups/";

export async function getGroups(): Promise<IGroup[]> {
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

export async function saveGroup(group: IGroup): Promise<IGroup> {
  return fetch(resource + (group.id || ""), {
    method: group.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(group),
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

export async function deleteGroup(groupID: number): Promise<{}> {
  return fetch(resource + groupID, { method: "DELETE" })
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
