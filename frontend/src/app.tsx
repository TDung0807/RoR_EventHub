import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  HashRouter,
} from "react-router-dom";
import {
  AdminHomePage,
  LoginPage,
  UserHomePage,
  AdminGuestPage,
  GuessGroupPage,
  UtilityPage,
  CalendarPage,
  DishedPage,
  UserCalendar,
  UserGuessPage,
  UserGuessGroupPage,
} from "./pages";
import { PrivateRoutes } from "./components";
import AdminLayout from "./layout/AdminLayout";
import UserLayout from "./layout/UserLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAccountAuthetication } from "./store";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const token = useAccountAuthetication((state) => state.token);
  const initializeAuth = useAccountAuthetication(
    (state) => state.initializeAuth
  );

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer></ToastContainer>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<PrivateRoutes />}>
              <Route element={<AdminLayout />}>
                <Route path="homepage" element={<AdminHomePage />}></Route>
                <Route path="guests" element={<AdminGuestPage />}></Route>
                <Route path="guests/:id" element={<GuessGroupPage />}></Route>
                <Route
                  path="utility/dished/:id"
                  element={<DishedPage />}
                ></Route>

                <Route path="utility" element={<UtilityPage />}></Route>
                <Route path="calendar" element={<CalendarPage />}></Route>
              </Route>
            </Route>
            <Route path="/user" element={<UserLayout />}>
              <Route path="homepage" element={<UserHomePage />}></Route>
              <Route path="calendar" element={<UserCalendar />}></Route>
              <Route path="guests" element={<UserGuessPage />}></Route>
              <Route path="guests/:id" element={<UserGuessGroupPage />}></Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
