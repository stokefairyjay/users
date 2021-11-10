import React from "react";
import { useUsersDataManager } from "../hooks/UseUsersDataManager";
import { IUser, IUsersContext } from "../interfaces";

export const initialContext = (): IUsersContext => {
    return { users: [] as IUser[], loading: true, hasError: false };
};

export const UsersContext = React.createContext(initialContext());

interface IUsersProviderProps {
    children: any;
}

export const UsersContextProvider = ({ children }: IUsersProviderProps) => {
    const { users, loading, hasError, handleDeleteUser, handleSaveUser } = useUsersDataManager();

    const provider: IUsersContext = {
        users,
        loading,
        hasError,
        handleDeleteUser,
        handleSaveUser,
    };

    return <UsersContext.Provider value={provider}>{children}</UsersContext.Provider>;
};
