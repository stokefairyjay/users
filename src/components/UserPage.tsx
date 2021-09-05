import React, { Component } from "react";
import FormInput from "./common/FormInput";
import TextArea from "./common/TextArea";
import {
  saveUser,
  getUserById,
  getGroupOptions,
  deleteUser,
} from "../services/userManagement";
import Spinner from "./common/Spinner";
import Select from "react-select";
import { toast } from "react-toastify";

interface IUserPageProps {
  userId: number;
  history: any;
  match: any;
}

interface IUserPageState {
  user: any;
  loading: boolean;
  saving: boolean;
  errors: any;
  groupOps: any;
}

class UserPage extends Component<IUserPageProps, IUserPageState> {
  constructor(props: IUserPageProps) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        age: null,
        city: "",
        country: "",
        bio: "",
        groups: [],
        id: null,
      },
      loading: true,
      saving: false,
      errors: {},
      groupOps: {},
    };
  }

  async componentDidMount() {
    const groupOps = await getGroupOptions();
    this.setState({
      groupOps,
    });

    if (this.props.match.params.id) {
      const user = await getUserById(+this.props.match.params.id);
      if (user) {
        this.setState({ user });
      }
    }

    this.setState({ loading: false });
  }

  handleFromVaildation = () => {
    const { firstName, lastName, age, city, country, bio } = this.state.user;
    let errors: any = {};

    if (!firstName) errors.firstName = "First Name is required.";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!age) errors.age = "Age is required";
    if (!city) errors.city = "City is required";
    if (!country) errors.country = "Country is required";
    if (!bio) errors.bio = "About is required";

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleSave = async (event: any) => {
    event.preventDefault();
    if (!this.handleFromVaildation()) return;

    this.setState({ saving: true });
    const resp = await saveUser(this.state.user);
    this.setState({ saving: false });

    if (resp?.id) {
      toast.success("user saved");
      this.props.history.push(`/`);
    } else {
      this.setState({
        errors: {
          handleSave:
            "An error occured whilst saving the user, please try again",
        },
      });
    }
  };

  handleChange = (event: any) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSelectChange = (selectedOps: any) => {
    const gid = selectedOps.map((ops: any) => {
      return ops.value;
    });

    this.setState({
      user: {
        ...this.state.user,
        groups: gid,
      },
    });
  };

  handleDeleteUser = async () => {
    try {
      await deleteUser(this.state.user.id);
      toast.success("user deleted");
    } catch (error) {
      toast.error("user failed to delete");
    }

    this.props.history.push(`/`);
  };

  getDefaultedGroups = () => {
    const { groupOps } = this.state;
    const { groups } = this.state.user;

    // eslint-disable-next-line array-callback-return
    return groupOps.map((op: any) => {
      if (groups.includes(op.value)) {
        return op;
      }
    });
  };

  render() {
    const { user, errors, loading, groupOps } = this.state;

    return (
      <>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={this.handleSave}>
            <h2>{user?.id ? "Edit" : "Add"} User</h2>

            {errors.onSave ? (
              <div className="alert alert-danger" role="alert">
                {errors.onSave}
              </div>
            ) : (
              ""
            )}
            <div className="row mb-3 mt-2">
              <div className="col-xs-12 col-sm-4">
                <FormInput
                  type="text"
                  name="firstName"
                  label="First Name"
                  value={user.firstName ? user.firstName : ""}
                  onChange={this.handleChange}
                  placeholder="please add your first name"
                  error={errors?.firstName}
                />
              </div>
              <div className="col-xs-12 col-sm-4 ">
                <FormInput
                  type="text"
                  name="lastName"
                  label="Last Name"
                  value={user.lastName ? user.lastName : ""}
                  onChange={this.handleChange}
                  placeholder="please add your last name"
                  error={errors?.lastName}
                />
              </div>
              <div className="col-xs-12 col-sm-4">
                <FormInput
                  type="number"
                  name="age"
                  label="Age"
                  value={user.age ? user.age : ""}
                  onChange={this.handleChange}
                  placeholder="please add your current age"
                  error={errors?.age}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xs-12 col-sm-6">
                <FormInput
                  type="text"
                  name="city"
                  label="City"
                  value={user.city ? user.city : ""}
                  onChange={this.handleChange}
                  placeholder="please add the city you currently live in"
                  error={errors?.city}
                />
              </div>
              <div className="col-xs-12 col-sm-6">
                <FormInput
                  type="text"
                  name="country"
                  label="Country"
                  value={user.country ? user.country : ""}
                  onChange={this.handleChange}
                  placeholder="please add the country you currently live in"
                  error={errors?.country}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xs-12 ">
                <TextArea
                  name="bio"
                  label="About"
                  value={user.bio ? user.bio : ""}
                  onChange={this.handleChange}
                  placeholder="please add a bit about yourself"
                  error={errors?.bio}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-xs-12 ">
                <div className="form-group">
                  <div className="field">
                    <Select
                      options={groupOps}
                      isMulti={true}
                      name="groups"
                      onChange={this.handleSelectChange}
                      defaultValue={this.getDefaultedGroups()}
                      placeholder="Become a Member of a Group"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              {user.id ? (
                <button
                  type="button"
                  disabled={this.state.saving}
                  className="btn btn-outline-danger"
                  style={{ marginRight: 5 }}
                  onClick={this.handleDeleteUser}
                >
                  {this.state.saving ? "Deleteing..." : "Delete"}
                </button>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={this.state.loading}
                className="btn btn-outline-primary"
              >
                {this.state.saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
}

export default UserPage;
