const users = [];

const addUser =({ socket_id, username, room_id})=>{
  
  if(!username || !room_id) return{ error : "Username and room are required"}

  const existingUser = users.find((user)=> user.room_id===room_id && user.username===username); 
  if(existingUser){
      return{error: "User already connected"}
  }
  const user = {socket_id, username, room_id};
  users.push(user);
  return {user};
}

const removeUser=(socket_id)=>{
 const Index = users.findIndex((user)=>user.socket_id === socket_id);

 if(Index !== -1){
     return users.splice(Index,1)[0]
 }

}

const getUser =(socket_id)=>  users.find((user) => user.socket_id === socket_id);


const getUsersInRoom = (room_id)=> users.filter((user)=> user.room_id === room_id )


module.exports ={addUser, removeUser , getUser, getUsersInRoom};