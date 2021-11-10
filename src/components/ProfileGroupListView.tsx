import React from "react";
import { IGroup } from "../interfaces";

interface IProfileGroupListProps {
    groups: IGroup[];
    filterGroups: (event: any) => void;
}

const ProfileGroupList = ({ groups, filterGroups }: IProfileGroupListProps) => {
    return (
        <>
            {groups?.length ? (
                <div className="user-card-row-wrap mt-2 mb-2">
                    {groups.map((group) => {
                        return (
                            <button
                                className="btn btn-info btn-group-mem"
                                key={group.id}
                                onClick={filterGroups}
                                value={group.id}
                            >
                                {group.name}
                            </button>
                        );
                    })}
                </div>
            ) : (
                <small className="text-muted">Not a member of any groups</small>
            )}
        </>
    );
};

export default ProfileGroupList;
