import React, { Component } from "react";
import UserListView from "./UserListView";
import Spinner from "./common/Spinner";
import { getUserList } from "../services/userManagement";

interface IUserListProps {}

interface IUserListState {
  users: any;
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

  searchUsers = (event: any) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredUsers = this.state.users?.filter(
      (user: any) =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
    );

    this.setState({
      filteredUsers,
    });
  };

  handleFilterGroups = (event: any) => {
    // eslint-disable-next-line array-callback-return
    const filteredUsers = this.state.users?.filter((user: any) => {
      for (let i = 0; i < user.groups.length; i++) {
        if (user.groups[i].id === +event.target.value) {
          return user;
        }
      }
    });

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
