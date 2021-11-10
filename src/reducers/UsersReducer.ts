import { IUser } from "../interfaces";

const usersReducer = (state: any, action: any) => {
    function removeUser(userId: number): IUser[] {
        return state.users.filter((user: IUser) => user.id !== userId);
    }

    switch (action.type) {
        case "setUsers": {
            return {
                ...state,
                users: action.data,
                loading: false,
            };
        }
        case "error": {
            return {
                ...state,
                hasError: true,
            };
        }
        case "deleteUser": {
            return {
                ...state,
                users: removeUser(action.userId),
            };
        }
        default:
            return state;
    }
};
export default usersReducer;
