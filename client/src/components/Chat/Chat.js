import React, { useEffect, useState } from 'react';
import Input from '../Input/Input';
import InfoBar from '../InfoBar/InfoBar';
import Messages from '../Messages/Messages';
import './Chat.css'

const Chat = ({room_id , username, setusers, Socket}) => {

  const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
 
  useEffect(() => {
    
    if(Socket){
  Socket.on('message', (message)=>{
      setMessages(messages => [...messages, message])  // Add the message to the messages array
    })
  Socket.on("roomData", ({users})=>{           
      setusers(users);
  })
}
    
}, [Socket]);

const sendMessage = (event)=>{
  event.preventDefault();   
  
  if(message){
      Socket.emit('sendMessage', message ,()=>setMessage(''));
  }                         
}

  return (
  <div className='chat'>
    <InfoBar room_id={room_id} /*users={users}*//>
    <Messages messages={messages} username={username}/>
    <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
    {/* </div> */}
  </div>
  );
}
export {Chat};
