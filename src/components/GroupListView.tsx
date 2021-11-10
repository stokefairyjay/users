import React from "react";
import { IGroupDetail } from "../interfaces";

interface IGroupListViewProps {
    groups: IGroupDetail[];
    onDeleteClick: (groupId: number) => Promise<void>;
}

const GroupListView = ({ groups, onDeleteClick }: IGroupListViewProps) => {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Number of Members</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                <>
                    {groups?.length && (
                        <>
                            {groups.map((group: IGroupDetail) => {
                                return (
                                    <tr key={group.id} className="group-row">
                                        <td>{group.id}</td>
                                        <td>{group.name}</td>
                                        <td>{group.memberCount}</td>
                                        <td>
                                            {group.memberCount === 0 ? (
                                                <>
                                                    <button
                                                        className="btn btn-outline-danger btn-slim"
                                                        onClick={() =>
                                                            onDeleteClick(
                                                                group.id
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </button>
                                                </>
                                            ) : (
                                                <small className="text-muted">
                                                    unable to delete with active
                                                    users
                                                </small>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </>
                    )}
                </>
            </tbody>
        </table>
    );
};

export default GroupListView;
