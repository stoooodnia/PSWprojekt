import React, { FC } from "react";

const NavBar: FC = () => {
  return (
    <nav className="m-5 p-2">
      <ul className="flex border-b-2 border-myGray">
        <li className="-mb-px mr-1">
          <a
            className="bg-white inline-block rounded-t py-2 px-4 text-gray-400 hover:text-myBlack active:text-myBlack  font-semibold"
            href="/play"
          >
            Graj
          </a>
        </li>
        <li className="mr-1">
          <a
            className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-myBlack active:text-myBlack font-semibold"
            href="/friends"
          >
            Znajomi
          </a>
        </li>
        <li className="mr-1">
          <a
            className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-myBlack active:text-myBlack font-semibold"
            href="/manual"
          >
            Zasady
          </a>
        </li>
        <li className="mr-1">
          <a
            className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-myBlack active:text-myBlack font-semibold"
            href="/stats"
          >
            Statystyki
          </a>
        </li>

        <li className="mr-1">
          <a
            className="bg-white inline-block py-2 px-4 text-gray-400 hover:text-myBlack active:text-myBlack font-semibold"
            href="/profile"
          >
            Profil
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
