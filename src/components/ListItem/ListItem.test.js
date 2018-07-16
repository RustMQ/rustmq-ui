import React from "react";
import LinkItem from "./ListItem";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";

it("renders correctly", () => {
  const queue = { id: 1, name: "Test pull", type: "pull", size: 38 };
  const tree = renderer
    .create(
      <MemoryRouter>
        <div>
          <LinkItem queue={queue} />
        </div>
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
