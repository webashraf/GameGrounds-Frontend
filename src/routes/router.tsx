import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout";
import MainLayout from "../components/layouts/MainLayout";
import About from "../components/Pages/About/About";
import FacilitiesAdd from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesAdd";
import FacilitiesUpdate from "../components/Pages/AdminDashboard/FacilitiesManagement/FacilitiesUpdate";
import Home from "../components/Pages/Home/Home";

const router = createBrowserRouter([
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
    element: <AdminLayout />,
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
