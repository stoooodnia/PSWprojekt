import React from "react";
import { NavLink } from "react-router-dom";
import Cookie from "js-cookie";

const NavBar = () => {
  const isAdmin = Cookie.get("isAdmin");

  const activeClassName =
    "bg-white inline-block rounded-t py-2 px-4 text-myBlack font-semibold";
  const normalClassName =
    "bg-white inline-block rounded-t py-2 px-4 text-gray-400 hover:text-myBlack active:text-myBlack  font-semibold";

  return (
    <nav className="m-5 p-2">
      <ul className="flex border-b-2 border-myGray">
        <li className="-mb-px mr-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
            to="/play"
          >
            Graj
          </NavLink>
        </li>
        <li id="/friends" className="mr-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
            to="/friends"
          >
            Użytkownicy
          </NavLink>
        </li>
        <li id="/manual" className="mr-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
            to="/manual"
          >
            Zasady
          </NavLink>
        </li>
        <li id="/stats" className="mr-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
            to="/stats"
          >
            Statystyki
          </NavLink>
        </li>

        <li id="/profile " className="mr-1">
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
            to="/profile/me"
          >
            Profil
          </NavLink>
        </li>
        <li
          id="/register "
          className="mr-1"
          hidden={isAdmin === "true" ? false : true}
        >
          <NavLink
            className={({ isActive }) =>
              isActive ? activeClassName : normalClassName
            }
            to="/register"
          >
            Dodaj użytkownika
          </NavLink>
        </li>
        <li id="/logout" className="mr-1">
          <NavLink
            className=" bg-white inline-block rounded-t py-2 px-4 font-semibold text-pink-500 hover:text-pink-800"
            to="/"
            onClick={() => {
              Cookie.remove("accessToken");
              Cookie.remove("refreshToken");
              Cookie.remove("user");
              Cookie.remove("userLoggedEmail");
              Cookie.remove("userLoggedNickname");
              Cookie.remove("userLoggedId");
              console.log("wylogowano");
            }}
          >
            Wyloguj
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
