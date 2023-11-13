import { Grid } from "@mui/material";
import { NavLink, Outlet, NavLinkProps } from "react-router-dom";
import React from "react";
import { AccountBox, GifBox, Person, Store } from "@mui/icons-material";

export type NavBarProps = {};

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col content-center items-center">
      <div className="flex gap-5 container p-3 shadow-lg mb-2">
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
          to={"/login"}
          className={"no-underline hover:text-orange-500 font-bold ml-auto"}
        >
          Cerrar sesion
        </NavLink>
      </div>
      <div className="container shadow-2xl h-full overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default NavBar;
