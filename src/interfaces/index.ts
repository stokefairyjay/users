export interface IUser {
    id: number | undefined;
    firstName: string;
    lastName: string;
    bio: string;
    age: number | string;
    city: string;
    country: string;
    gids?: number[];
    groups?: IGroup[];
}

export interface IUserError {
    firstName?: string;
    lastName?: string;
    age?: string;
    city?: string;
    country?: string;
    bio?: string;
    onSave?: string;
    validation?: string;
}

export interface IGroup {
    id: number;
    name: string;
}

export interface IGroupDetail extends IGroup {
    memberCount: number;
}

export interface IOption {
    value?: string | number;
    label?: string;
}

export interface ISimpleError {
    message?: string;
}

export interface IUsersContext {
    users: IUser[];
    loading: Boolean;
    hasError: Boolean;
    handleDeleteUser?: (userId: number) => void;
    handleSaveUser?: any;
}
