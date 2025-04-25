
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import '@fortawesome/fontawesome-free/css/all.min.css';
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
import Tutorials from './components/Tutorials/Tutorials';
import CrimeReports from './components/crime-reports/CrimeReports';


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
      { path: "tutorials", element: <Tutorials /> },
      { path: "CrimeReports", element: <CrimeReports /> },

      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
