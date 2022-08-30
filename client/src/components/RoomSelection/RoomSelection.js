import React, { useState } from "react";
import Button from "@mui/material/Button";
import "./RoomSelection.css";
import TextField from "@mui/material/TextField";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";

function RoomSelection({setroom_credentials}) {
  const [room_id_error, setroom_id_error] = useState(false);
  const [room_pass_error, setroom_pass_error] = useState(false);
  const [room_id_error_text, setroom_id_error_text] = useState("Room ID");
  const [room_pass_error_text, setroom_pass_error_text] = useState("Room password");
  // const [room_id, setroom_id] = useState("")
  
  const handleJoinClick = () => {
    const roomId = document.getElementById("room_id");
    const roomPass = document.getElementById("room_pass")
    
    if (roomId.value.length === 0) {
      setroom_id_error(true);
      setroom_id_error_text("Room ID cannot be empty");
    }
    else if(roomPass.value.length === 0){
      setroom_pass_error(true);
      setroom_pass_error_text("Room password cannot be empty");
    }
    else {
      setroom_id_error(false);
      setroom_pass_error(false);
      setroom_id_error_text("");
      setroom_pass_error_text("");
      setroom_credentials({room_id : roomId.value, room_pass : roomPass.value})
    }

  };
  return (
    <div className="room_selection_body">
      <div className="room_selection_buttons">
        {/* <Button variant="contained" startIcon={<AddCircleIcon/>}>Create Room</Button> */}
        <TextField
          label="Room ID"
          variant="standard"
          id="room_id"
          error={room_id_error}
          helperText={room_id_error_text}
        />
        <TextField
          label="Room password"
          variant="standard"
          id="room_pass"
          error={room_pass_error}
          helperText={room_pass_error_text}
          type="password"
        />
        <Button
          id="room_btn"
          variant="contained"
          // startIcon={<MeetingRoomIcon />}
          color="success"
          onClick={handleJoinClick}
        >
          Join Room
        </Button>
      </div>
    </div>
  );
}

export default RoomSelection;
