import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import { Server} from 'socket.io'
import mongoConnect from './db/MongoDB.js';
import path from 'path';
import { handleRegister, handleLogin, handleLogout, getUser, newConversation, getUserConversation, addUserChat, getUserChat } from './Controller/userController.js';
import { validateSchema, loginValidation } from './Validations/registerValidation.js';
import checkUserToken from './Middelwere/checkUserToken.js';
import validateUser from './Middelwere/checkValidation.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// server configuration
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// config dependency
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
mongoConnect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/chatDataBase');


// EJS connetion
app.use(express.static(path.resolve('./public')))
app.get('/', (req, res) => {
  res.sendFile("/public/index.html");
})




// routes connections
app.route('/user/register').post(validateUser(validateSchema), handleRegister); // register routes
app.route('/user/login').post(validateUser(loginValidation), handleLogin); // login routes
app.route('/user/logout').get(handleLogout) // logout routes
app.route('/user/chat/:id').get(getUser); // get user from userModel database
app.route('/user/conversation').post(newConversation); // add user converation in conversation database
app.route('/user/conversation/:userId').get(getUserConversation); // get user from conversation database
app.route('/user/chatuser').post(checkUserToken, addUserChat); // add user to chat user database 
app.route('/user/chatuser/:chatId').get(getUserChat); // get user to chat user database
app.get('/user/chat', checkUserToken, (req, res) => {
  res.json({ user: req.user, message: "Access granted to chat data" });
}) // login user can access this routes data

// socket connections

let activeUsers = [];

io.on('connection' , (socket)=>{
    // add new users in the activeUsers array
    socket.on('new-user-add',(newUserId) =>{
        // user not add priviously
        if (newUserId) {
            // Check if the user has not already been added
            if (!activeUsers.some((user) => user.userId === newUserId)) {
                activeUsers.push({ userId: newUserId, socketId: socket.id });
                console.log('New user added', activeUsers);
                io.emit('get-users',activeUsers);
            }
        }

        // get data from client and send to all users whos connect to sockets
        socket.on('send-Message',(userData) =>{
          const {receiverId} = userData;
          const user = activeUsers.find((user)=>user.userId === receiverId);
          console.log('getting id from recieved user', receiverId);
          console.log(userData)
          if(user){
            io.to(user.socketId).emit('recieved-message',userData)
          }
        })

    // disconnect the user
    socket.on('disconnect' , ()=>{
      activeUsers = activeUsers.filter((user)=>user.socketId !== socket.id);
      console.log('User disconnected',activeUsers);
      io.emit('get-users',activeUsers);
    })
})})


// server listen
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server listening on http://localhost:${port} `))
