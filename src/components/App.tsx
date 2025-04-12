import React, { useEffect } from "react";
import {
  Navigate,
  useNavigate,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import DashboardPage from "components/dashboard/DashboardPage";
import LoginPage from "components/LoginPage";
import Unauthorized from "components/UnauthorizedPage";
import ForgotPassword from "components/login/ForgotPassword";
import { useAuthStateWatcher } from "hooks/firebase/auth";
import { useViewsList } from "./dashboard/views/viewsList";
import theme from "../theme";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useAuthStateWatcher();
  const userAuthorized = true;
  const viewsList = useViewsList(user);

  // Global login checks
  useEffect(() => {
    if (!isLoading) {
      if (
        !user &&
        location.pathname !== "/login" &&
        location.pathname !== "/forgot-password"
      ) {
        navigate("/login", { state: { from: location }, replace: true });
      }
      if (user && !userAuthorized) {
        navigate("/unauthorized", {
          state: { from: location },
          replace: true,
        });
      }
    }
  }, [user, userAuthorized, navigate, location, isLoading]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<DashboardPage user={user} />}>
          <Route
            index
            element={<Navigate to={`/dashboard/${viewsList[0].key}`} replace />}
          />
          {viewsList.map((view) => (
            <Route
              key={view.key}
              path={`${view.key}`}
              element={<view.component />}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
