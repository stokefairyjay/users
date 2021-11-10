import { render, screen, within } from "@testing-library/react";
import { IGroupDetail } from "../interfaces";
import GroupListView from "./GroupListView";

const defaultData: IGroupDetail[] = [{ name: "jj group", memberCount: 0, id: 1 }];

function renderHelper(data: IGroupDetail[] = defaultData) {
    render(<GroupListView groups={data} onDeleteClick={jest.fn()} />);
}

test("it should load the table", () => {
    const data = [{ name: "jj group", memberCount: 2, id: 1 }];
    renderHelper(data);
    const table = screen.queryByRole("table");
    expect(table).not.toBeNull();
});

test("it should not be able to delete with active members", () => {
    const data = [{ name: "jj group", memberCount: 2, id: 1 }];

    renderHelper(data);
    const text = screen.getByText(/unable to delete with active users/i);

    expect(text).toBeInTheDocument();
});

test("it should be able to delete with no active members", () => {
    renderHelper();
    const b = screen.getByRole("button", {
        name: /delete/i,
    });

    expect(b).toBeInTheDocument();
});
