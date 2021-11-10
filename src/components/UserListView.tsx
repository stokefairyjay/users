import React from "react";
import { IUser } from "../interfaces";
import ProfileGroupListView from "./ProfileGroupListView";
import profileImg from "../assets/profile.png";
import { Link } from "react-router-dom";
import Highlight from "./common/Highlight";

interface IUserListViewProps {
    users: IUser[];
    filterGroups: (event: any) => void;
    searchTerm: string;
}

const UserListView = ({
    users,
    filterGroups,
    searchTerm,
}: IUserListViewProps) => (
    <>
        {users ? (
            users.map((user: IUser) => {
                return (
                    <div className="user-card mb-4" key={user.id}>
                        <div className="user-card-row">
                            <img src={profileImg} alt=""></img>

                            <div className="user-card-col">
                                <div className="user-card-row">
                                    <h5>
                                        {searchTerm.length ? (
                                            <>
                                                <Highlight
                                                    searchString={`${user.firstName} ${user.lastName}`}
                                                    searchTerm={searchTerm}
                                                    style={{ color: "red" }}
                                                />
                                            </>
                                        ) : (
                                            `${user.firstName} ${user.lastName}`
                                        )}
                                    </h5>
                                    <Link to={`/user/${user.id}`}>
                                        <i className="fa fa-edit ml-2"></i>
                                    </Link>
                                </div>

                                <h6 className="mb-2 text-muted">
                                    {user.age} years old{" "}
                                    {user.city &&
                                        user.country &&
                                        `living in ${user.city}, ${user.country} `}
                                </h6>
                                <p>{user.bio}</p>
                            </div>
                        </div>
                        {user.groups && (
                            <ProfileGroupListView
                                groups={user.groups}
                                filterGroups={filterGroups}
                            />
                        )}
                    </div>
                );
            })
        ) : (
            <div className="alert alert-danger">
                Looks like an error occured loading users
            </div>
        )}
    </>
);

export default UserListView;
