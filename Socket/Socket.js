// const io = require('socket.io')(8000 , {
//     cors:{
//         origin:"http://localhost:5173",
//     },
// });

// let activeUsers = [];

// io.on('connection' , (socket)=>{
//     // add new users in the activeUsers array
//     socket.on('new-user-add',(newUserId) =>{
//         // user not add priviously
//         if (newUserId) {
//             // Check if the user has not already been added
//             if (!activeUsers.some((user) => user.userId === newUserId)) {
//                 activeUsers.push({ userId: newUserId, socketId: socket.id });
//                 console.log('New user added', activeUsers);

//                 io.emit('active-users',activeUsers);
//             }
//         } else {
//             console.log('Invalid newUserId:', newUserId);
//         }


//     // disconnect the user
//     socket.on('disconnect' , ()=>{
//       let  activeUser = activeUsers.filter((user)=>user.socketId !== socket.id);
//       console.log('User disconnected',activeUser);
//       io.emit('active-users',activeUser);
//     })
// })})









// ()