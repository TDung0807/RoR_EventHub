import React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet, Link } from "react-router-dom";

import { UserNavbar, UserHeader } from "../components";

const queryClient = new QueryClient();
function UserLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserNavbar></UserNavbar>
      <div style={{ marginLeft: 126 }}>
        <UserHeader></UserHeader>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default UserLayout;
