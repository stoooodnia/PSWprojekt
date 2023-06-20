import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { randomSpy2 } from "../utils/randomSpy";
import Cookie from "js-cookie";
import { saveAs } from "file-saver";
import { useKeycloak } from "@react-keycloak/web";

interface Friend {
  nickname: string;
  email: string;
}

interface Props {
  friends: Friend[];
}

const Friends = () => {
  const { keycloak } = useKeycloak();

  const isAdmin = Cookie.get("isAdmin");
  const [searchTerm, setSearchTerm] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const [Friends, setFriends] = useState([] as any[]);
  useEffect(() => {
    // TODO fetch friends from server
    // CRUD 5 - GET - Get friends / WYSZUKIWANIE WZORCA
    if (searchTerm === "") {
      fetch("http://localhost:1337/api/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: Cookie.get("userLoggedNickname"),
        }),
      })
        .then((res) => res.json())
        .then((resdata) => {
          console.log(JSON.stringify(resdata.data.data));
          setFriends(resdata.data.data);
        });
    } else {
      fetch(`http://localhost:1337/api/friends/${searchTerm}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname: Cookie.get("userLoggedNickname"),
        }),
      })
        .then((res) => res.json())
        .then((resdata) => {
          console.log(JSON.stringify(resdata));
          setFriends(resdata.data.data);
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
  const handleDownload = () => {
    fetch("http://localhost:1337/api/getAllUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.text())
      .then((text) => {
        var blob = new Blob([text], { type: "text/csv;charset=utf-8" });
        saveAs(blob, "users.csv");
      });
  };

  const handleImport = () => {
    const input = document.getElementById("import") as HTMLInputElement;
    //check if files attached
    if (input.files && input.files[0]) {
      //send csv file to server
      const formData = new FormData();
      formData.append("file", input.files[0]);
      fetch("http://localhost:1337/api/importUsers", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((resdata) => {
          console.log(resdata);
        });
    }
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
        <div className="flex">
          <button
            hidden={isAdmin === "true" ? false : true}
            type="submit"
            className="w-56 bg-white hover:bg-gray-100 text-gray-800 font-semibold mb-5 py-2 px-4 border-2 rounded shadow"
            onClick={() => handleDownload()}
          >
            pobierz wszystkich użytkowników
          </button>
          {/* <input id="import" type="file" />
          <button
            className="w-56 bg-white hover:bg-gray-100 text-gray-800 font-semibold mb-5 py-2 px-4 border-2 rounded shadow"
            onClick={() => handleImport()}
          >
            wgraj plik
          </button> */}
        </div>
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
