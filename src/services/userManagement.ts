import * as userAPI from "../api/user";
import * as groupAPI from "../api/group";
import countBy from "lodash.countby";

import { IUser, IGroup, IOption, IGroupDetail } from "../interfaces";

export async function getUserList(): Promise<IUser[]> {
  try {
    const result: [IUser[], IGroup[]] = await Promise.all([
      userAPI.getUsers(),
      groupAPI.getGroups(),
    ]);

    const users = result[0];
    const groups = result[1];

    return users
      .map((user: IUser) => {
        return {
          ...user,
          groups: groups.filter((group: IGroup) =>
            user.gids?.includes(group.id)
          ),
          age: +user.age,
        };
      })
      .reverse();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function saveUser(user: IUser): Promise<IUser | null> {
  try {
    const resp: IUser = await userAPI.saveUser(user);
    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getUserById(userId: number): Promise<IUser | null> {
  try {
    return userAPI.getUserById(userId);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteUser(userId: number): Promise<void> {
  try {
    await userAPI.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }
  return;
}

export async function getGroupOptions(): Promise<IOption[]> {
  try {
    const groups: IGroup[] = await groupAPI.getGroups();

    return groups.map((group: IGroup) => {
      return {
        value: group.id,
        label: group.name,
      };
    });
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getGroups(): Promise<IGroupDetail[]> {
  try {
    const users: IUser[] = await userAPI.getUsers();
    const activeGroups: any = users
      .map((user: IUser) => {
        return user.gids;
      })
      .flat();

    const groupCounts = countBy(activeGroups);

    const groups: IGroup[] = await groupAPI.getGroups();

    return groups
      .map((group: IGroup) => {
        return {
          ...group,
          memberCount: groupCounts[group.id] ? groupCounts[group.id] : 0,
        };
      })
      .reverse();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function deleteGroup(groupId: number): Promise<void> {
  try {
    groupAPI.deleteGroup(groupId);
  } catch (error) {
    console.log(error);
  }
  return;
}

export async function addGroup(group: IGroup): Promise<void> {
  try {
    groupAPI.saveGroup(group);
  } catch (error) {
    console.log(error);
  }
  return;
}
