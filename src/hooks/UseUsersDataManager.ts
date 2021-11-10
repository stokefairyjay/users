import { useEffect, useReducer } from "react";
import { IUser } from "../interfaces";
import usersReducer from "../reducers/UsersReducer";
import { deleteUser, getUserList, saveUser } from "../services/userManagement";
import { initialContext } from "../contexts/UsersContext";

export function useUsersDataManager() {
    const [{ users, loading, hasError }, dispatch] = useReducer(usersReducer, initialContext());

    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getUserList();
            dispatch({ type: "setUsers", data });
        };
        try {
            fetchUsers();
        } catch (error) {
            dispatch({ type: "error" });
        }

        return () => {
            console.log("useUsersDataManager cleanup");
        };
    }, []);

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            dispatch({ type: "deleteUser", userId });
        } catch (error) {
            dispatch({ type: "error" });
        }
    };

    const handleSaveUser = async (user: IUser) => {
        try {
            const userResp = await saveUser(user);
            if (userResp?.id) {
                const data = await getUserList();
                dispatch({ type: "setUsers", data });
            }
        } catch (error) {
            dispatch({ type: "error" });
        }
    };

    return { users, loading, hasError, handleDeleteUser, handleSaveUser };
}
