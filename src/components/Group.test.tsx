import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Group from "./Group";

function renderHelper() {
    render(<Group />);
}

test("it should not show the save group button by default", () => {
    renderHelper();
    const b = screen.queryByRole("button", {
        name: /save/i,
    });
    expect(b).toBeNull();
});

test("it should show the save group button when add new group is clicked", () => {
    renderHelper();
    const b1 = screen.getByRole("button", {
        name: /add new group/i,
    });

    userEvent.click(b1);

    const b2 = screen.getByRole("button", {
        name: /save/i,
    });

    expect(b2).toBeInTheDocument();
});

test("it should show an error on an empty input in the group name text input", () => {
    renderHelper();

    const b1 = screen.getByRole("button", {
        name: /add new group/i,
    });

    userEvent.click(b1);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "");
    const b2 = screen.getByRole("button", {
        name: /save/i,
    });
    userEvent.click(b2);
    const error = screen.getByText(/name is required/i);

    expect(error).toBeInTheDocument();
});

test("it should not error on input in the group name text input", () => {
    renderHelper();

    const b1 = screen.getByRole("button", {
        name: /add new group/i,
    });

    userEvent.click(b1);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "a new group name");
    const b2 = screen.getByRole("button", {
        name: /save/i,
    });
    userEvent.click(b2);

    const error = screen.queryByText(/name is required/i);

    expect(error).toBeNull();
});
