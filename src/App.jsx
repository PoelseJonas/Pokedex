import { createHashRouter, RouterProvider, Outlet } from "react-router-dom";

import Pokedex from "./pages/Pokedex";
import PokemonDetails from "./pages/PokemonDetails";
import About from "./pages/About";
import NavBar from "./components/Navbar";

function Layout() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

//Opretter et objekt som holder styr på hvad der skal vises gennem URL'en
const router = createHashRouter([
  {
    element: <Layout />, // 👈 wrapper
    children: [
      {
        path: "/",
        element: <Pokedex />,
      },
      {
        path: "/pokemon/:name",
        element: <PokemonDetails />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
