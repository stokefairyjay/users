import React from "react";
import { IGroup } from "../interfaces";

const ProfileGroupList = (props: {
  groups: IGroup[];
  filterGroups: (event: any) => void;
}) => {
  return (
    <>
      {props.groups?.length ? (
        <div className="user-card-row-wrap mt-2 mb-2">
          {props.groups.map((group) => {
            return (
              <button
                className="btn btn-info btn-group-mem"
                key={group.id}
                onClick={props.filterGroups}
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
