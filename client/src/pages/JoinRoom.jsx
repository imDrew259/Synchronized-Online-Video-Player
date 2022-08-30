import React,{useEffect,useState} from 'react'
import Navbar from '../components/Navbar'

import RoomSelection from '../components/RoomSelection/RoomSelection'

import {Home} from './Home/Home'

const JoinRoom = ({currUser, setCurrUser}) => {

    // const [room_id, setroom_id] = useState("")
    // const [room_pass, setroom_pass] = useState("");
    
    const [room_credentials, setroom_credentials] = useState(null);
    return (
        <div>
            <Navbar currUser={currUser} setCurrUser={setCurrUser}/>
            {!room_credentials ? <RoomSelection setroom_credentials={setroom_credentials}/>:<Home room_credentials={room_credentials} username={currUser}/>}
        </div>
    )
}

export default JoinRoom
