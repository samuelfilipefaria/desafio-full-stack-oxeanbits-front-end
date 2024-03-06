import * as React from 'react';
import { Menu, MenuItem } from "@progress/kendo-react-layout";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';
import "../App.css";

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

  return <React.Fragment>
      <AppBar>
        <AppBarSection>
          <ul style={{display: "flex"}}>
            <li><Link to="/"><span>Movies</span></Link></li>
            <li><Link to="/create-movies"><span>Create movie(s)</span></Link></li>
            <li><Link to="/logout"><span>Logout</span></Link></li>
            {isAdmin === "true" && <li><Link to="/create-account"><span>Create account</span></Link></li>}
          </ul>
        </AppBarSection>
      </AppBar>
    </React.Fragment>;
}
