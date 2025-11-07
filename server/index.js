// const express = require("express")
// const socketio = require("socket.io")
// const http = require("http")

// const {addUser , removeUser , getUser , getUsersInRoom } = require('./users.js')

// const PORT = process.env.PORT || 5000 

// const router = require('./router')

// const app = express()
// const server = http.createServer(app)

// const io = socketio(server)
// io.on('connection' , (socket)=> {
//     socket.on('join' , ({name , room} , callback)=> {
//         const {error , user} = addUser({id : socket.id , name , room})

//         if(error) {
//             return callback(error)
//         }
//         socket.emit('message' , {user : 'admin' , text : `${user.name} , welcome to the room ${user.room}`})
//         socket.broadcast.to(user.room).emit('message' , {user : 'admin' , text : `${user.name}, has joined!`})

//         socket.join(user.room)
//         callback()
//     }) ;

//         socket.on("sendMessage" , (message , callback) => {
//             const user = getUser(socket.id)

//             io.to(user.room).emit('message' , {user : user.name , text: message })
//             callback()
//         })

//     socket.on('disconnect' , () => {
//         console.log('User had left!!!')
//     } )
// })  

// app.use(router)

// server.listen(PORT , ()=>console.log(`Server has started on port ${PORT}`))





// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

// const PORT = process.env.PORT || 5000;
// const router = require("./router");

// const app = express();
// app.use(cors()); // Allow cross-origin requests
// app.use(router);

// const server = http.createServer(app);

// // ✅ Configure CORS for socket.io
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // your React app origin
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New WebSocket connection");

//   socket.on("join", ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if (error) return callback(error);

//     socket.emit("message", {
//       user: "admin",
//       text: `${user.name}, welcome to the room ${user.room}`,
//     });

//     socket.broadcast
//       .to(user.room)
//       .emit("message", { user: "admin", text: `${user.name} has joined!` });

//     socket.join(user.room);
//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);

//     if (user) {
//       io.to(user.room).emit("message", { user: user.name, text: message });
//     }

//     callback();
//   });

//   socket.on("disconnect", () => {
//     console.log("User left the chat");
//     removeUser(socket.id);
//   });
// });

// server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));




// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
// const router = require("./router");

// const PORT = process.env.PORT || 5000;

// const app = express();

// // ✅ Allow requests from React app
// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST"],
//   credentials: true,
// }));

// const server = http.createServer(app);

// // ✅ Initialize socket.io with CORS config
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("✅ New WebSocket connection");

//   socket.on("join", ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });
//     if (error) return callback(error);

//     socket.emit("message", {
//       user: "admin",
//       text: `${user.name}, welcome to room ${user.room}`,
//     });
//     socket.broadcast
//       .to(user.room)
//       .emit("message", { user: "admin", text: `${user.name} has joined!` });

//     socket.join(user.room);


//     io.to(user.name).emit('roomData' , {room : user.room , users : getUsersInRoom(user.room)})
//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);
//     if (user) {
//       io.to(user.room).emit("message", { user: user.name, text: message });
//       io.to(user.room).emit("roomData", { room: user.room, users : getUsersInRoom(user.room) });
//     }
//     callback();
//   });

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected");
//     removeUser(socket.id);
//   });
// });

// app.use(router);

// server.listen(PORT, () =>
//   console.log(`🚀 Server running on port ${PORT}`)
// );



// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");
// const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
// const router = require("./router");

// const PORT = process.env.PORT || 5000;

// const app = express();

// app.use(cors({
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST"],
//   credentials: true,
// }));

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

// // io.on("connection", (socket) => {
// //   console.log("✅ New WebSocket connection");

// //   socket.on("join", ({ name, room }, callback) => {
// //     const { error, user } = addUser({ id: socket.id, name, room });
// //     if (error) return callback(error);

// //     socket.join(user.room);

// //     // Send welcome message to the user
// //     socket.emit("message", {
// //       user: "admin",
// //       text: `${user.name}, welcome to room ${user.room}.`,
// //     });

// //     // Notify others in the room
// //     socket.broadcast
// //       .to(user.room)
// //       .emit("message", { user: "admin", text: `${user.name} has joined!` });

// //     // ✅ Emit updated room data (users in the room)
// //     io.to(user.room).emit("roomData", {
// //       room: user.room,
// //       users: getUsersInRoom(user.room),
// //     });

// //     callback();
// //   });

// //   socket.on("sendMessage", (message, callback) => {
// //     const user = getUser(socket.id);
// //     if (user) {
// //       io.to(user.room).emit("message", { user: user.name, text: message });

// //       // ✅ Emit room data again (in case needed)
// //       io.to(user.room).emit("roomData", {
// //         room: user.room,
// //         users: getUsersInRoom(user.room),
// //       });
// //     }
// //     callback();
// //   });

// //   socket.on("disconnect", () => {
// //     const user = removeUser(socket.id);
// //     if (user) {
// //       io.to(user.room).emit("message", {
// //         user: "admin",
// //         text: `${user.name} has left.`,
// //       });

// //       // ✅ Update room data when someone leaves
// //       io.to(user.room).emit("roomData", {
// //         room: user.room,
// //         users: getUsersInRoom(user.room),
// //       });
// //     }

// //     console.log("❌ User disconnected");
// //   });
// // });

// // app.use(router);

// // server.listen(PORT, () =>
// //   console.log(`🚀 Server running on port ${PORT}`)
// // );


// io.on("connection", (socket) => {
//   console.log("✅ New WebSocket connection");

//   socket.on("join", ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });
//     if (error) return callback(error);

//     socket.join(user.room);

//     socket.emit("message", {
//       user: "admin",
//       text: `${user.name}, welcome to room ${user.room}.`,
//     });

//     socket.broadcast
//       .to(user.room)
//       .emit("message", { user: "admin", text: `${user.name} has joined!` });

//     // ✅ Emit updated room data
//     const roomUsers = getUsersInRoom(user.room);
//     console.log("📡 Emitting roomData:", roomUsers);
//     io.to(user.room).emit("roomData", {
//       room: user.room,
//       users: roomUsers,
//     });

//     callback();
//   });

//   socket.on("sendMessage", (message, callback) => {
//     const user = getUser(socket.id);
//     if (user) {
//       io.to(user.room).emit("message", { user: user.name, text: message });

//       const roomUsers = getUsersInRoom(user.room);
//       io.to(user.room).emit("roomData", {
//         room: user.room,
//         users: roomUsers,
//       });
//     }
//     callback();
//   });

//   socket.on("disconnect", () => {
//     const user = removeUser(socket.id);
//     if (user) {
//       io.to(user.room).emit("message", {
//         user: "admin",
//         text: `${user.name} has left.`,
//       });

//       const roomUsers = getUsersInRoom(user.room);
//       console.log("📡 After disconnect roomData:", roomUsers);
//       io.to(user.room).emit("roomData", {
//         room: user.room,
//         users: roomUsers,
//       });
//     }

//     console.log("❌ User disconnected");
//   });
// });







const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");
const router = require("./router");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true,
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("✅ New WebSocket connection");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
    console.log("❌ User disconnected");
  });
});

// ✅ START SERVER
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

