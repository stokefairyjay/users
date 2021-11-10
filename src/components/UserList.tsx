import React, { ChangeEvent, useState, useEffect, useContext } from "react";
import UserListView from "./UserListView";
import { IUser, IGroup } from "../interfaces/index";
import { UsersContext } from "../contexts/UsersContext";
import Spinner from "./common/Spinner";

const UserList = () => {
    const { users, loading, hasError } = useContext(UsersContext);
    const [filteredUsers, setFilteredUsers] = useState<IUser[]>([] as IUser[]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        users.sort((a: any, b: any) => {
            if (a.id < b.id) {
                return 1;
            } else if (a.id > b.id) {
                return -1;
            }
            return 0;
        });

        setFilteredUsers(users);
    }, [users]);

    const searchUsers = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length) {
            const searchTerm = event.target.value.trim();

            const filteredUsers = users
                ?.filter((user: IUser) => {
                    const fullName = `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`;

                    if (fullName.indexOf(searchTerm) !== -1) {
                        return user;
                    }
                    return null;
                })
                .filter((ele: IUser | null) => ele != null);

            setSearchTerm(searchTerm);
            setFilteredUsers(filteredUsers);
        } else {
            setSearchTerm("");
            setFilteredUsers(users);
        }
    };

    const handleFilterGroups = (event: any) => {
        const groupId: number = +event.target.value;

        const filteredUsers = users
            .map((user: IUser) => {
                if (
                    user.groups &&
                    user.groups
                        .map((g: IGroup) => {
                            return g.id;
                        })
                        .includes(groupId)
                ) {
                    return user;
                }
                return null;
            })
            .filter((el: IUser | null) => el != null);

        if (filteredUsers) {
            setFilteredUsers(filteredUsers as IUser[]);
        }
    };

    const resetFilters = () => {
        setFilteredUsers(users);
    };

    return hasError ? (
        <div className="alert alert-danger">something broke</div>
    ) : users && !loading ? (
        <>
            <div className="row">
                <div className="col-sm-10 mb-2">
                    <input type="text" name="searchUsers" onChange={searchUsers} placeholder="search for a user" />
                </div>
                <div className="col-sm-2">
                    <button className="btn btn-outline-info btn-sm" onClick={resetFilters}>
                        reset all filters
                    </button>
                </div>
            </div>

            {filteredUsers.length ? (
                <UserListView users={filteredUsers} filterGroups={handleFilterGroups} searchTerm={searchTerm} />
            ) : (
                <div className="alert alert-info">Sorry no results found for the term: {searchTerm}</div>
            )}
        </>
    ) : (
        <Spinner />
    );
};

export default UserList;
