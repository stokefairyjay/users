import * as userAPI from "../api/user";
import * as groupAPI from "../api/group";
import countBy from "lodash.countby";

import {
  IUserGroup,
  IUser,
  IGroup,
  IOptions,
  IGroupDetail,
} from "../interfaces";

export async function getUserList(): Promise<IUserGroup[] | null> {
  try {
    const users: IUser[] = await userAPI.getUsers();
    const groups: IGroup[] = await groupAPI.getGroups();

    return users
      .map((user) => {
        return {
          ...user,
          // eslint-disable-next-line array-callback-return
          groups: groups.filter((group) => {
            if (user.groups?.includes(group.id)) {
              return group;
            }
          }),
        };
      })
      .reverse();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function saveUser(user: IUser): Promise<IUser | null> {
  try {
    return userAPI.saveUser(user);
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
    userAPI.deleteUser(userId);
  } catch (error) {
    console.log(error);
  }
  return;
}

export async function getGroupOptions(): Promise<IOptions[] | null> {
  try {
    const groups = await groupAPI.getGroups();

    return groups.map((group: IGroup) => {
      return {
        value: group.id,
        label: group.name,
      };
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getGroups(): Promise<IGroupDetail[] | null> {
  try {
    const users = await userAPI.getUsers();
    const activeGroups = users
      .map((user: IUser) => {
        return user.groups;
      })
      .flat();

    const groupCounts = countBy(activeGroups);

    const groups = await groupAPI.getGroups();

    return groups
      .map((group: any) => {
        return {
          ...group,
          memberCount: groupCounts[group.id] ? groupCounts[group.id] : 0,
        };
      })
      .reverse();
  } catch (error) {
    console.log(error);
    return null;
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
