import { AdminNavbar, AdminHeader } from "../components";
import React from "react";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Outlet, Link } from "react-router-dom";

const queryClient = new QueryClient();
function AdminLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AdminNavbar></AdminNavbar>
      <div style={{ marginLeft: 126 }}>
        <AdminHeader></AdminHeader>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}

export default AdminLayout;
