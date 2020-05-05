import React from "react";

import ReactDOM from "react-dom";

import { MemoryRouter, Route } from "react-router-dom";

import DashboardPage from "./DashboardPage";

it("renders without crashing", () => {
  const div = document.createElement("div");

  ReactDOM.render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>,
    div
  );

  ReactDOM.unmountComponentAtNode(div);
});