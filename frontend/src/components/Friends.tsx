import React, { useState, useEffect, useRef } from "react";
import NavBar from "./NavBar";
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
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [Friends, setFriends] = useState([] as any[]);
  useEffect(() => {
    // TODO fetch friends from server
    // CRUD 5 - GET - Get friends / WYSZUKIWANIE WZORCA
    if (searchTerm === "") {
      fetch("http://localhost:1337/api/friends", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFriends(data.users);
        });
    } else {
      fetch(`http://localhost:1337/api/friends/${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFriends(data.users);
        });
    }
  }, [searchTerm]);
  // const getFriends = () => {
  //   //  TODO fetch friends from server
  //   return friends;
  // };

  // const [Friends, setFriends] = useState(friends);

  // useEffect(() => {
  //   const handleSearch = () => {
  //     setFriends(
  //       friends.filter((friend) =>
  //         friend.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  //       )
  //     );
  //   };

  //   handleSearch();
  // }, [searchTerm, friends]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-row h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div className="w-1/2">
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
              {Friends.map((friend, i) => (
                <li key={i} className="flex gap-2">
                  <a className="hover:text-2xl" href={`friends/${friend._id}`}>
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
