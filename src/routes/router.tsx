import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../components/Pages/About/About";
import Home from "../components/Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

export default router;
