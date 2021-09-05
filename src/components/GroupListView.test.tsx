import { render, screen } from "@testing-library/react";
import GroupListView from "./GroupListView";

it("should not be able to delete with active members", () => {
  const data = [{ name: "jj group", memberCount: 2, id: 1 }];

  render(<GroupListView groups={data} onDeleteClick={() => {}} />);
  const text = screen.getByText(/unable to delete with active users/i);

  expect(text).toBeInTheDocument();
});
