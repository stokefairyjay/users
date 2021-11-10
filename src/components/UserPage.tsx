import React, { SyntheticEvent, ChangeEvent, useState, useEffect, useContext } from "react";
import FormInput from "./common/FormInput";
import TextArea from "./common/TextArea";
import { IUser, IUserError, IOption } from "../interfaces/index";
import { getUserById, getGroupOptions } from "../services/userManagement";
import Spinner from "./common/Spinner";
import Select from "react-select";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { UsersContext } from "../contexts/UsersContext";

interface IUserPageParams {
    id: string | undefined;
}

const UserPage = () => {
    const {
        handleDeleteUser: handleDeleteUserCtx,
        handleSaveUser: handleSaveUserCtx,
        hasError: hasErrorCtx,
    } = useContext(UsersContext);

    //const history = useHistory();
    const initialUser: IUser = {
        firstName: "",
        lastName: "",
        age: 0,
        city: "",
        country: "",
        bio: "",
        gids: [],
        id: 0,
    };

    const [user, setUser] = useState<IUser | null>(initialUser);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<IUserError>({} as IUserError);
    const [groupOps, setGroupOps] = useState<IOption[]>([] as IOption[]);
    const [defaultedOps, setDefaultedOps] = useState<IOption[]>([]);

    const { id }: IUserPageParams = useParams();

    useEffect(() => {
        async function fetchData() {
            const groupOps = await getGroupOptions();
            setGroupOps(groupOps);

            if (id) {
                const data = await getUserById(+id);
                let selectedOps: IOption[] = [];
                if (data) {
                    const { gids } = data;
                    if (gids) {
                        selectedOps = groupOps
                            .map((op: any) => {
                                if (gids.includes(op.value)) {
                                    return op;
                                }
                                return null;
                            })
                            .filter((el: any) => el != null);
                    }
                }

                setDefaultedOps(selectedOps);
                setUser(data);
            }
            setLoading(false);
        }
        fetchData();
    }, [id]);

    const handleFormValidation = (): Boolean => {
        let errors: IUserError = {};

        if (!user?.firstName.length) {
            errors.firstName = "First Name is required.";
        }
        if (!user?.lastName.length) {
            errors.lastName = "Last Name is required";
        }
        if (user?.age === 0) {
            errors.age = "Age is required";
        }
        if (!user?.city.length) {
            errors.city = "City is required";
        }
        if (!user?.country) {
            errors.country = "Country is required";
        }
        if (!user?.bio.length) {
            errors.bio = "About is required";
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    };

    const handleSave = async (event: SyntheticEvent) => {
        event.preventDefault();

        if (!handleFormValidation()) {
            return;
        }

        handleSaveUserCtx(user);
        toast.success("user saved");
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
        const data: any = { ...user, [event.target.name]: event.target.value };
        setUser(data);
    };

    const handleSelectChange = (selectedOps: any) => {
        const gids: any = selectedOps.map((ops: IOption) => ops.value);
        const data: any = { ...user, gids };
        setUser(data);
    };

    const handleDeleteUser = async () => {
        if (user && handleDeleteUserCtx) {
            const { id } = user;
            if (id) {
                handleDeleteUserCtx(id);
                setUser(initialUser);
                setDefaultedOps([]);
                toast.success("user deleted");
            }
        }
    };

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSave}>
                    <h2>{user?.id ? "Edit" : "Add"} User</h2>

                    {hasErrorCtx ? (
                        <div className="alert alert-danger" role="alert">
                            an error has occured
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
                                value={user?.firstName ? user.firstName : ""}
                                onChange={handleChange}
                                placeholder="please add your first name"
                                error={errors.firstName ? errors.firstName : ""}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-4 ">
                            <FormInput
                                type="text"
                                name="lastName"
                                label="Last Name"
                                value={user?.lastName ? user.lastName : ""}
                                onChange={handleChange}
                                placeholder="please add your last name"
                                error={errors.lastName ? errors.lastName : ""}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-4">
                            <FormInput
                                type="number"
                                name="age"
                                label="Age"
                                value={user?.age ? user.age : ""}
                                onChange={handleChange}
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
                                value={user?.city ? user.city : ""}
                                onChange={handleChange}
                                placeholder="please add the city you currently live in"
                                error={errors.city ? errors.city : ""}
                            />
                        </div>
                        <div className="col-xs-12 col-sm-6">
                            <FormInput
                                type="text"
                                name="country"
                                label="Country"
                                value={user?.country ? user.country : ""}
                                onChange={handleChange}
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
                                value={user?.bio ? user.bio : ""}
                                onChange={handleChange}
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
                                        onChange={handleSelectChange}
                                        defaultValue={defaultedOps}
                                        placeholder="Become a Member of a Group"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {user?.id ? (
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                style={{ marginRight: 5 }}
                                onClick={handleDeleteUser}
                            >
                                {"Delete"}
                            </button>
                        ) : (
                            ""
                        )}

                        <button type="submit" disabled={loading} className="btn btn-outline-primary">
                            Save
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default UserPage;
