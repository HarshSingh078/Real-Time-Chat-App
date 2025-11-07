
const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const user = { id, name, room };
  users.push(user);
  console.log("✅ User added:", users); 
  return { user };
};

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    const removed = users.splice(index, 1)[0];
    console.log("❌ User removed:", removed);
    return removed;
  }
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase(); 
  const roomUsers = users.filter((user) => user.room === room);
  console.log("📋 Users in room:", room, roomUsers);
  return roomUsers;
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
