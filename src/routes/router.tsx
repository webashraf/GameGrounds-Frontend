import { createBrowserRouter } from "react-router-dom";
import About from "../components/Pages/About/About";
import Home from "../components/Pages/Home/Home";
import AdminLayout from "../components/layouts/AdminLayout/AdminLayout";
import MainLayout from "../components/layouts/MainLayout";

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
  },
]);

export default router;
