import React, { useContext } from "react";
import { UsersContext } from "../../contexts/UsersContext";

const ActiveUserCount = () => {
    const { users } = useContext(UsersContext);
    return (
        <>
            <small>active users</small>
            <span className="badge badge-pill badge-primary" style={{ color: "black" }}>
                {users.length}
            </span>
        </>
    );
};

export default ActiveUserCount;
