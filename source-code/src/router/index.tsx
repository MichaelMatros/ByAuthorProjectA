import React from "react";
import { RouterProvider } from "react-router-dom";

import { useRoutes } from "./routes";

function index() {
  const routes = useRoutes();

  return <RouterProvider router={routes} />;
}

export default index;
