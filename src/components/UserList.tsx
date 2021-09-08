import React, { Component, ChangeEvent } from "react";
import UserListView from "./UserListView";
import Spinner from "./common/Spinner";
import { getUserList } from "../services/userManagement";
import { IUserGroup, IGroup } from "../interfaces/index";

interface IUserListProps {}

interface IUserListState {
  users: IUserGroup[];
  loading: boolean;
  filteredUsers: any;
}

class UserList extends Component<IUserListProps, IUserListState> {
  constructor(props: IUserListProps) {
    super(props);

    this.state = {
      users: [],
      filteredUsers: [],
      loading: true,
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
    const searchTerm = event.target.value.toLowerCase();

    const filteredUsers = this.state.users?.filter(
      (user: IUserGroup) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
    );

    this.setState({
      filteredUsers,
    });
  };

  handleFilterGroups = (event: ChangeEvent<HTMLInputElement>) => {
    const { users } = this.state;
    const groupId: number = +event.target.value;

    const filteredUsers = users
      .map((user: IUserGroup) => {
        if (
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
      .filter((el: any) => el != null);

    this.setState({
      filteredUsers,
    });
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

        <UserListView
          users={this.state.filteredUsers}
          filterGroups={this.handleFilterGroups}
        />
      </>
    ) : (
      <Spinner />
    );
  }
}

export default UserList;
