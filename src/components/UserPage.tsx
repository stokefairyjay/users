import React, { Component, SyntheticEvent, ChangeEvent } from "react";
import FormInput from "./common/FormInput";
import TextArea from "./common/TextArea";
import { IUser, IUserError, IOption } from "../interfaces/index";
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
  user: IUser;
  loading: boolean;
  errors: IUserError;
  groupOps: IOption[];
}

class UserPage extends Component<IUserPageProps, IUserPageState> {
  constructor(props: IUserPageProps) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        age: 0,
        city: "",
        country: "",
        bio: "",
        gids: [],
        id: 0,
      },
      loading: true,
      errors: {},
      groupOps: [],
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

  handleFormValidation = () => {
    const { firstName, lastName, age, city, country, bio } = this.state.user;
    let errors: IUserError = {};

    if (!firstName) errors.firstName = "First Name is required.";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!age) errors.age = "Age is required";
    if (!city) errors.city = "City is required";
    if (!country) errors.country = "Country is required";
    if (!bio) errors.bio = "About is required";

    this.setState({ errors });

    return Object.keys(errors).length === 0;
  };

  handleSave = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!this.handleFormValidation()) return;

    const resp = await saveUser(this.state.user);

    if (resp?.id) {
      toast.success("user saved");
      this.props.history.push(`/`);
    } else {
      this.setState({
        errors: {
          onSave: "An error occured whilst saving the user, please try again",
        },
      });
    }
  };

  handleChange = (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSelectChange = (selectedOps: any) => {
    const gids: any = selectedOps.map((ops: IOption) => ops.value);

    this.setState({
      user: {
        ...this.state.user,
        gids,
      },
    });
  };

  handleDeleteUser = async () => {
    try {
      const { id } = this.state.user;
      if (id) {
        await deleteUser(id);
        toast.success("user deleted");
      }
    } catch (error) {
      toast.error("user failed to delete");
    }

    this.props.history.push(`/`);
  };

  getDefaultedGroups = () => {
    const { groupOps } = this.state;
    const { gids } = this.state.user;
    if (gids) {
      return groupOps
        .map((op: any) => {
          if (gids.includes(op.value)) {
            return op;
          } else return null;
        })
        .filter((el: any) => el != null);
    }
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
                  error={errors.firstName ? errors.firstName : ""}
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
                  error={errors.lastName ? errors.lastName : ""}
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
                  error={errors.age ? errors.age : ""}
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
                  error={errors.city ? errors.city : ""}
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
                  error={errors.country ? errors.country : ""}
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
                  error={errors.bio ? errors.bio : ""}
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
                      name="gids"
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
                  className="btn btn-outline-danger"
                  style={{ marginRight: 5 }}
                  onClick={this.handleDeleteUser}
                >
                  {"Delete"}
                </button>
              ) : (
                ""
              )}

              <button
                type="submit"
                disabled={this.state.loading}
                className="btn btn-outline-primary"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </>
    );
  }
}

export default UserPage;
