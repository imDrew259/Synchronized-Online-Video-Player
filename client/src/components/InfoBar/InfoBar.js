import React from 'react'
import closeIcon from "../../Icons/closeIcon.png"
import onlineIcon from "../../Icons/onlineIcon.png"
import './InfoBar.css'

const InfoBar = ({room_id}) => {
  return (
    <div className='infoBar'>
    <div className='top'>
        <img className='onlineIcon' src={onlineIcon} alt="online"/>
        <h3>{room_id}</h3>
    </div>
  </div>
    );
};

export default InfoBar;
