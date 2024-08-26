import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import About from "../components/Pages/About/About";
import FacilitiesAdd from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesAdd";
import FacilitiesUpdate from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesUpdate";
import Home from "../components/Pages/Home/Home";
import Login from "../components/Pages/User/Login";
import UserSignUp from "../components/Pages/User/userSignUp";

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <UserSignUp />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <div>
            <h2 className="text-7xl uppercase">Welcome to admin dashboard</h2>
          </div>
        ),
      },
      {
        path: "facilities-add",
        element: <FacilitiesAdd />,
      },
      {
        path: "facilities-update",
        element: <FacilitiesUpdate />,
      },
    ],
  },
]);

export default router;
