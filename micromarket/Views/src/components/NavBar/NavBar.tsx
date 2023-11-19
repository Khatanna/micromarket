import { Category, Person, Store } from "@mui/icons-material";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col content-center items-center">
      <div className="flex gap-5 container p-4 shadow-lg mb-2">
        <NavLink
          to={"users"}
          className="no-underline hover:text-orange-500 font-bold"
        >
          <Person />
          Usuarios
        </NavLink>
        <NavLink
          to={"products"}
          className="no-underline hover:text-orange-500 font-bold"
        >
          <Store />
          Productos
        </NavLink>
        <NavLink
          to={"categories"}
          className="no-underline hover:text-orange-500 font-bold"
        >
          <Category />
          Categorias
        </NavLink>
        <NavLink
          to={"store"}
          className="no-underline hover:text-orange-500 font-bold"
        >
          <Store />
          Almacen
        </NavLink>
        <NavLink
          to={"/login"}
          className={"no-underline hover:text-orange-500 font-bold ml-auto"}
        >
          Cerrar sesion
        </NavLink>
      </div>
      <div className="container shadow-2xl h-full max-h-full overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
