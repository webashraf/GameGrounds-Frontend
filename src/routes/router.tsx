import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout";
import MainLayout from "../components/layouts/MainLayout";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import About from "../components/Pages/About/About";
import AddAdmin from "../components/Pages/AdminDashboard/AddAdmin/AddAdmin";
import FacilitiesAdd from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesAdd";
import FacilitiesUpdate from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesUpdate";
import Booking from "../components/Pages/Booking/Booking";
import Contact from "../components/Pages/Contact/Contact";
import Facilities from "../components/Pages/Facilities/Facilities";
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
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "facilities",
        element: <Facilities />,
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
        element: (
          <ProtectedRoute role="admin">
            {" "}
            <FacilitiesAdd />
          </ProtectedRoute>
        ),
      },
      {
        path: "facilities-update",
        element: (
          <ProtectedRoute role="admin">
            <FacilitiesUpdate />
          </ProtectedRoute>
        ),
      },
      {
        path: "add-admin",
        element: (
          <ProtectedRoute role="admin">
            <AddAdmin />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
