
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home/Home";
import Careers from "./components/Careers/Careers";
import About from "./components/About/About";
import Enterprise from "./components/Enterprise/Enterprise";
import Premium from "./components/Premium/Premium";
import Support from "./components/Support/Support";
import Notfound from "./components/Notfound/Notfound";
import Explore from "./components/Explore/Explore";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "careers", element: <Careers /> },
      { path: "about", element: <About /> },
      { path: "enterprise", element: <Enterprise /> },
      { path: "premium", element: <Premium /> },
      { path: "support", element: <Support /> },
      { path: "explore", element: <Explore /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
