import React, { Component, SyntheticEvent, ChangeEvent } from "react";
import { getGroups, deleteGroup, addGroup } from "../services/userManagement";
import Spinner from "./common/Spinner";
import GroupListView from "./GroupListView";
import { toast } from "react-toastify";

interface IGroupPageProps {}

interface IGroupPageState {
  groups: any;
  newGroup: any;
  loading: boolean;
  showAddGroupInput: boolean;
  errors: any;
}

class Group extends Component<IGroupPageProps, IGroupPageState> {
  constructor(props: IGroupPageProps) {
    super(props);

    this.state = {
      groups: [],
      newGroup: {
        name: "",
      },
      loading: true,
      showAddGroupInput: false,
      errors: {},
    };
  }

  async componentDidMount() {
    const groups = await getGroups();

    this.setState({
      groups,
      loading: false,
    });
  }

  handleDelete = async (groupId: number) => {
    try {
      await deleteGroup(groupId);
      toast.success("group deleted");

      const groups = await getGroups();

      this.setState({ groups });
    } catch (error) {
      toast.error("user failed to delete");
    }
  };

  handleAddGroupBtn = (event: SyntheticEvent) => {
    this.setState({ showAddGroupInput: true });
  };

  handleOnChangeNewGroup = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newGroup: {
        name: event.target.value,
      },
    });
  };

  handleAddGroup = async (event: SyntheticEvent) => {
    if (this.state.newGroup.name.length) {
      this.setState({ loading: true });

      await addGroup(this.state.newGroup);

      const groups = await getGroups();

      this.setState({
        groups,
        loading: false,
        newGroup: {
          name: "",
        },
        showAddGroupInput: false,
      });

      toast.success("new group was added");
    } else {
      this.setState({
        errors: {
          newGroup: "name is required",
        },
      });
    }
  };

  render() {
    return (
      <>
        {this.state.loading ? <Spinner /> : ""}
        {
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={this.handleAddGroupBtn}
          >
            Add New Group
          </button>
        }
        {this.state.showAddGroupInput ? (
          <div className="row mt-4 mb-4">
            <div className="col-sm-8">
              <input
                type="text"
                name="newGroup"
                className="form-control"
                placeholder="please add the name of the new group"
                onChange={this.handleOnChangeNewGroup}
                value={this.state.newGroup.name}
              />
              {this.state.errors.newGroup ? (
                <div className="alert alert-danger">
                  {this.state.errors.newGroup}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="col-sm-4">
              <button
                className="btn btn-outline-success"
                onClick={this.handleAddGroup}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          ""
        )}
        {this.state.groups && this.state.groups.length ? (
          <GroupListView
            groups={this.state.groups}
            onDeleteClick={this.handleDelete}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default Group;
