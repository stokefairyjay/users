export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  city: string;
  country: string;
  groups: number[];
}

export interface IGroup {
  id: number;
  name: string;
}

export interface IGroupDetail {
  id: number;
  name: string;
  memberCount: number;
}

export interface IUserGroup {
  id: number;
  firstName: string;
  lastName: string;
  bio: string;
  age: number;
  city: string;
  country: string;
  groups: IGroup[];
}

export interface IAPIUserResponse {
  ok: boolean;
  text: any;
  status: number;
  json: IUser[];
}

export interface IAPIGroupResponse {
  ok: boolean;
  text: any;
  status: number;
  json: IGroup[];
}

export interface IOptions {
  value: string | number;
  label: string;
}
