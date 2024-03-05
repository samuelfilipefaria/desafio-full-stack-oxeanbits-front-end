import { Menu, MenuItem } from "@progress/kendo-react-layout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const NavBar = (props) => {
  axios.defaults.headers.common['Authorization'] = localStorage.getItem("user_token");

  const navigate = useNavigate();
  const onSelect = (event) => {
    navigate(event.item.data.route);
  };

  const [isAdmin, setIsAdmin] = useState("false");

  useEffect(() => {
    axios.get("http://127.0.0.1:3000/users/is_admin")
    .then(function (response) {
      console.log(response);
      setIsAdmin(response.data.is_admin);
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function () {
    });
  }, [])

  return (
    <div>
      <Menu onSelect={onSelect}>
        <MenuItem
          text="Movies"
          data={{
            route: "/",
          }}
        />
        <MenuItem
          text="Create movie(s)"
          data={{
            route: "/create-movies",
          }}
        />
        <MenuItem
          text="Logout"
          data={{
            route: "/logout",
          }}
        />
        {isAdmin === "true" && <MenuItem text="Create account" data={{route: "/create-account",}}/>}
      </Menu>
    </div>
  );
}
