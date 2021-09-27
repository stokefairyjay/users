import React, { Component, ChangeEvent } from "react";
import UserListView from "./UserListView";
import Spinner from "./common/Spinner";
import { getUserList } from "../services/userManagement";
import { IUser, IGroup } from "../interfaces/index";

interface IUserListProps {}

interface IUserListState {
    users: IUser[];
    loading: boolean;
    filteredUsers: IUser[];
    searchTerm: string;
}

class UserList extends Component<IUserListProps, IUserListState> {
    constructor(props: IUserListProps) {
        super(props);

        this.state = {
            users: [],
            filteredUsers: [],
            loading: true,
            searchTerm: "",
        };
    }

    async componentDidMount() {
        const users = await getUserList();
        this.setState({
            users,
            loading: false,
            filteredUsers: users,
        });
    }

    searchUsers = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length) {
            const searchTerm = event.target.value.trim();
            const regex = new RegExp(searchTerm, "gis");

            const filteredUsers = this.state.users
                ?.filter((user: IUser) => {
                    const fullName = `${user.firstName} ${user.lastName}`;

                    if (fullName.match(regex)) {
                        return user;
                    }
                    return null;
                })
                .filter((ele: IUser | null) => ele != null);

            this.setState({
                searchTerm,
                filteredUsers,
            });
        } else {
            this.setState({
                searchTerm: "",
                filteredUsers: this.state.users,
            });
        }
    };

    handleFilterGroups = (event: any) => {
        const { users } = this.state;
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
            this.setState({
                filteredUsers: filteredUsers as IUser[],
            });
        }
    };

    resetFilters = () => {
        this.setState({
            filteredUsers: this.state.users,
        });
    };

    render() {
        return this.state.users && !this.state.loading ? (
            <>
                <div className="row">
                    <div className="col-sm-10 mb-2">
                        <input
                            type="text"
                            name="searchUsers"
                            onChange={this.searchUsers}
                            placeholder="search for a user"
                        />
                    </div>
                    <div className="col-sm-2">
                        <button
                            className="btn btn-outline-info btn-sm"
                            onClick={this.resetFilters}
                        >
                            reset all filters
                        </button>
                    </div>
                </div>

                {this.state.filteredUsers.length ? (
                    <UserListView
                        users={this.state.filteredUsers}
                        filterGroups={this.handleFilterGroups}
                        searchTerm={this.state.searchTerm}
                    />
                ) : (
                    <div className="alert alert-info">
                        Sorry no results found for the term:{" "}
                        {this.state.searchTerm}
                    </div>
                )}
            </>
        ) : (
            <Spinner />
        );
    }
}

export default UserList;
