// Definitely not the strongest when it comes to FE testing libraries. but it's smoething i would really love to learn.

import { render, screen } from "@testing-library/react";
import { click } from "@testing-library/user-event/dist/click";
import { act } from "react-dom/test-utils";
import App from "../App";
import { dogClient } from "../clients/DogClient";

test("Table should have a new row upon Add button clicked", () => {
  render(<App />);
  const addButton = screen.getByTestId("add-dog-btn");
  click(addButton);

  const row = screen.getByTestId("dog-row");

  expect(row).toBeInTheDocument();
});

test("row should be removed when 'Remove' button is clicked", () => {
  render(<App />);
  const addButton = screen.getByTestId("add-dog-btn");
  click(addButton);
  const removeButton = screen.getByText("Remove");
  click(removeButton);
  expect(screen.queryByTestId("dog-row")).toBeNull();
});

test("breeds should fetch", async () => {
  render(<App />);
  await act(async () => {
    const breeds = await dogClient.getAllBreeds();
    expect(Object.keys(breeds).length).toBeGreaterThan(0);
  });
});
