import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import Button from "@mui/material/Button";
import { Avatar } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import { LogoutCall } from "../ApiCalls";
import {socket} from "../pages/Home/Home"

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}
function stringAvatar(name) {
  if(name===undefined)
  {name="None"
  }
  name=`${name}  `
  const first=name.split(' ')[0][0]
  const last=name.split(' ')[1][0]
  var short=""
  if(last===undefined)
  short=first
  else short=first+last
  return {

    sx: {
      bgcolor: stringToColor(name),
    },
    children: short,
  };
}


const Navbar = ({currUser, setCurrUser}) => {
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    socket && socket.disconnect();
   const res = await LogoutCall();
   if(res.status === 200){
     setCurrUser(null);
   }
  }

  return (
    <div className="navbar_body">
      <div className="website_name">
        <b>Watch-Party</b>
      </div>
      <div className="nav_bar_details">
        <div className="user_details">
          <Tooltip title={ currUser||"Hello"}>
          <Avatar {...stringAvatar(currUser)} />
          </Tooltip>
        </div>
        <div className="about_us">About Us</div>
        <Button
          color="error"
          variant="contained"
          onClick={handleLogout}
          className="logout"
        >
          LogOut
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
