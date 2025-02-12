import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, Link } from "react-router-dom";

const queryClient = new QueryClient();
function UserLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}

export default UserLayout;
