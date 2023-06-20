import React, { useMemo, useEffect, useState, useLayoutEffect } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { randomSpy } from "../utils/randomSpy";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "js-cookie";
import { useKeycloak } from "@react-keycloak/web";

type User = {
  nickname: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const { keycloak, initialized } = useKeycloak();

  if (!initialized) {
    return <div className="text-5xl">Loading...</div>;
  }

  const isAdmin = keycloak.hasRealmRole("APP-ADMIN");

  const [Profil, setProfil] = useState<User>({} as User);
  let spyClass = "";
  // CRUD 3 - GET - Get profile of logged user, or another user
  const { id } = useParams();
  useEffect(() => {
    if (id === "me") {
      const nickname = keycloak.tokenParsed?.preferred_username;
      setProfil({
        nickname: nickname as string,
      });
    } else {
      fetch(`http://localhost:1337/api/profile/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((resdata) => {
          console.log(resdata);
          setProfil({
            nickname: resdata.data.data.nickname,
          });
        })
        .catch((err) => {
          console.log("nie znaleziono użytkownika");
          setProfil({
            nickname: "???",
          });
        });
    }
  }, []);

  useMemo(() => {
    spyClass = randomSpy();
  }, [Profil]);

  return (
    <div className="flex flex-row h-screen w-screen">
      <div
        id="spy"
        className="flex h-full w-1/2 items-center justify-center gap-24 text-white"
      >
        <div className="eye">.</div>
        <div className="eye">.</div>
      </div>
      <div id="right" className="w-1/2">
        <NavBar />
        <div id="main ">
          <div className="flex gap-10 ml-1">
            <FontAwesomeIcon className={spyClass} icon={faUserSecret} />
            <div>
              <h1 className="text-7xl">{Profil.nickname}</h1>
              <h2 className="text-5xl">i jest fanem keycloak :D</h2>
            </div>
          </div>
          {/* <button
            hidden={id === "me" && isAdmin ? false : true}
            onClick={() => {
              navigate(`/profile/details/${Profil.nickname}`);
            }}
            className="mt-5 w-42 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
          >
            {" "}
            zmień dane{" "}
          </button>
          <button
            hidden={id !== "me" && isAdmin ? false : true}
            onClick={() => {
              navigate(`/profile/details/${id}`);
            }}
            className="mt-5 w-42 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded shadow"
          >
            {" "}
            zmień dane{" "}
          </button> */}
          {/* <button
            hidden={id === "me" && isAdmin ? false : true}
            onClick={() => {
              // CRUD 10 - DELETE - Delete profile
              fetch(`http://localhost:1337/api/profile/${Profil.nickname}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (response.status === 200) {
                    Cookie.remove("user");
                    alert("profil usunięto pomyślnie");
                    navigate("/");
                  } else {
                    alert("nie udało się usunąć profilu");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="ml-5 mt-5 w-42 bg-white hover:bg-gray-100 text-pink-500 hover:text-pink-800 font-semibold py-2 px-4 border rounded shadow"
          >
            usuń profil
          </button>{" "}
          <button
            hidden={id !== "me" && isAdmin ? false : true}
            onClick={() => {
              // CRUD 10 - DELETE - Delete profile
              fetch(`http://localhost:1337/api/profile/${id}`, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              })
                .then((response) => {
                  if (response.status === 200) {
                    Cookie.remove("user");
                    alert("profil usunięto pomyślnie");
                    navigate("/play");
                  } else {
                    alert("nie udało się usunąć profilu");
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
            className="ml-5 mt-5 w-42 bg-white hover:bg-gray-100 text-pink-500 hover:text-pink-800 font-semibold py-2 px-4 border rounded shadow"
          >
            usuń profil
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Profile;
