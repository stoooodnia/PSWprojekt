import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
import { friends } from "../utils/samples";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { randomSpy2 } from "../utils/randomSpy";

interface Friend {
  nickname: string;
  email: string;
}

interface Props {
  friends: Friend[];
}

const Friends = () => {
  const getFriends = () => {
    //  TODO fetch friends from server
    return friends;
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFriends, setFilteredFriends] = useState(friends);
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleSearch = () => {
      setFilteredFriends(
        friends.filter((friend) =>
          friend.nickname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    };

    handleSearch();
  }, [searchTerm, friends]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-row h-screen w-screen">
      <div id="spy" className="flex h-full w-1/2" />
      <div>
        <NavBar />
        <div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Search for friends"
              ref={searchInput}
              onChange={handleChange}
              value={searchTerm}
              className="w-56 text-center bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-myWhite focus:border-myBlack"
            />
            <ul className="flex flex-col gap-1 text-xl">
              {filteredFriends.map((friend, i) => (
                <li key={i} className="flex gap-2">
                  <a
                    className="hover:text-2xl"
                    href={`friends/${friend.nickname}`}
                  >
                    <FontAwesomeIcon
                      className={randomSpy2()}
                      icon={faUserSecret}
                    />
                    {friend.nickname}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
