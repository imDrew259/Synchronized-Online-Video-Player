import React, { useEffect, useState } from 'react';
import './RoomData.css'
import { socket } from '../Chat/Chat';

const RoomData = ({users}) => {

  return (
  <div className='roomData'>
     {users && users.map((user)=><span className="span" key={user.socket_id}>{user.username},</span>)}
  </div>
  );
};

export default RoomData;
