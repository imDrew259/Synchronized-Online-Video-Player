import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Chat } from "../../components/Chat/Chat";
import RoomData from "../../components/RoomData/RoomData";
import Video from "../../components/Video/Video";
import "./Home.css";
import io from "socket.io-client";

let socket = null;

const ENDPOINT = "http://localhost:5000";

const Home = ({ room_credentials, username }) => {
  const [Socket, setSocket] = useState(null);

  // const room_id = room_credentials.room_id;
  // const room_pass = room_credentials.room_pass;

  const navigate = useNavigate();
  useEffect(() => {
    if (room_credentials && username) {
      socket = io(ENDPOINT);
      setSocket(socket);
    }
  }, [room_credentials, username]);

  useEffect(() => {
    if (Socket) {
      Socket.emit("join", { username, room_credentials }, (error) => {
        if (error) {
          Socket.disconnect();
          alert(error);
          navigate("/login");
        }
      });
    }
  }, [Socket]);

  const [users, setusers] = useState(null);

  const room_id = room_credentials.room_id;
  return (
    <div>
      {/* <Navbar/> */}
      <RoomData users={users} />
      <div className="home">
        <Video className="homevid" Socket={Socket} />
        <Chat
          className="homechat"
          Socket={Socket}
          room_id={room_id}
          username={username}
          setusers={setusers}
        />
      </div>
    </div>
  );
};

export { Home, socket };
