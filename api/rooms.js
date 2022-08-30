let rooms = [] ;

const addRoom = ({room_id, room_pass}) => {
    const users_count = 0;
    const room ={room_id, room_pass, users_count};
    rooms.push(room);
    console.log("Adding new room");
    console.log("room");
    return {room_id};
}

const findRoom = ({room_id, room_pass})=>{

    if(!room_id || !room_pass) {
        return {error1 : "Both room_id and room_password are required"};
    }

    const existingRoom = rooms.find((room)=> room.room_id === room_id);
    if(!existingRoom){
        console.log("No existing room found");
        return addRoom({room_id, room_pass});
    }
    else{
        console.log("existing room found");
        if(existingRoom.room_pass !== room_pass){
            console.log("Invalid password");
          return{error1 : "Invalid room_password"}
        }
        else{
            console.log("correct password");
          return {room_id};
        }
    }
}

const count_increment = (room_id)=>{
    const room_Index = rooms.findIndex((room)=> room.room_id === room_id);
    if(room_Index != -1){
       const room = rooms[room_Index];
       rooms[room_Index] = {room_id : room.room_id, room_pass: room.room_pass, users_count: room.users_count + 1};
       console.log(rooms[room_Index]);
    }
}

const count_decrement = (room_id) =>{
    const room_Index = rooms.findIndex((room)=> room.room_id === room_id);
    if(room_Index != -1){
        const room = rooms[room_Index];
        rooms[room_Index] = {room_id : room.room_id, room_pass: room.room_pass, users_count: room.users_count - 1};
        console.log(rooms[room_Index]);
        if(rooms[room_Index].users_count === 0){
            deleteRoom(room_Index);
        }
    }
}

const deleteRoom = (room_Index)=>{
  rooms.splice(room_Index, 1);
  console.log("room deleted");
  console.log(rooms);
}

module.exports = {findRoom, count_increment, count_decrement};