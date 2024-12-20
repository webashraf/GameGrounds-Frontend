import { createBrowserRouter } from "react-router-dom";
import UserLayout from "../components/layouts/DashboardLayout/DashboardLayout";
import MainLayout from "../components/layouts/MainLayout/MainLayout";
import ProtectedRoute from "../components/layouts/ProtectedRoute";
import About from "../components/Pages/About/About";
import AddAdmin from "../components/Pages/AdminDashboard/AddAdmin/AddAdmin";
import BookingManagement from "../components/Pages/AdminDashboard/BookingManagement/BookingManagement";
import AddFacility from "../components/Pages/AdminDashboard/FacilitiesManagement/AddFacility";
import FacilitiesUpdate from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesUpdate";
import WelcomeAdminDashboard from "../components/Pages/AdminDashboard/WelcomeAdminDeshboard";
import Booking from "../components/Pages/Booking/Booking";
import Contact from "../components/Pages/Contact/Contact";
import ErrorPage from "../components/Pages/ErrorPage/ErrorPage";
import UnAuthorizedUser from "../components/Pages/ErrorPage/UnAuthorizedUser";
import Facilities from "../components/Pages/Facilities/Facilities";
import Home from "../components/Pages/Home/Home";
import SingleFacility from "../components/Pages/SingleFacility/SingleFacility";
import Login from "../components/Pages/User/Login";
import UserSignUp from "../components/Pages/User/SignUp";
import CreateFeedback from "../components/Pages/UserDashboard/FeedBack/CreateFeedback";
import DetailsBooking from "../components/Pages/UserDashboard/MyBookings/DetailsBooking";
import MyBookings from "../components/Pages/UserDashboard/MyBookings/MyBookings";
import WelcomeUserDashboard from "../components/Pages/UserDashboard/WelcomeUserDashboard";

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorizedUser />,
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
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <UserSignUp />,
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
      {
        path: "single-facility/:id",
        element: <SingleFacility />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute role="admin">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="admin">
            <WelcomeAdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "facilities-add",
        element: (
          <ProtectedRoute role="admin">
            <AddFacility />
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
        path: "booking-management",
        element: (
          <ProtectedRoute role="admin">
            <BookingManagement />
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
  {
    path: "/user",
    element: (
      <ProtectedRoute role="user">
        <UserLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute role="user">
            <WelcomeUserDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "my-booking",
        element: (
          <ProtectedRoute role="user">
            <MyBookings />
          </ProtectedRoute>
        ),
      },
      {
        path: "feedback",
        element: (
          <ProtectedRoute role="user">
            <CreateFeedback />
          </ProtectedRoute>
        ),
      },
      {
        path: "details-booking",
        element: (
          <ProtectedRoute role="user">
            <DetailsBooking />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;
