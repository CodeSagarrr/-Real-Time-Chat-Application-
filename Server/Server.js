import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import mongoConnect from './db/MongoDB.js';
import path from 'path';
import { handleRegister, handleLogin, sendMessage , handleLogout } from './Controller/userController.js';
import { validateSchema, loginValidation } from './Validations/registerValidation.js';
import checkUserToken from './Middelwere/checkUserToken.js';
import validateUser from './Middelwere/checkValidation.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// server configuration
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// config dependency
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(cors());
mongoConnect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/chatDataBase');


// html connetion
// app.use(express.static(path.resolve('./public')))
// app.get('/', (req, res) => {
//     res.sendFile("/public/index.html");
// })

// EJS connetion
app.use(express.static(path.resolve('./public')))
app.get('/', (req, res) => {
    res.sendFile("/public/index.html");
})




// routes connections
app.route('/user/register').post(validateUser(validateSchema), handleRegister);
app.route('/user/login').post(validateUser(loginValidation), handleLogin);
app.route('/user/logout').get(handleLogout)
app.route('/user/chat').post( sendMessage);
app.get('/user/chat',checkUserToken,(req,res)=>{
  res.json({ user: req.user, message: "Access granted to chat data" });
})

// socket connections
io.on('connection',(socket)=>{
    console.log('Web-Socket connection established');
 
    socket.on('join',(reciever)=>{
        socket.join(reciever);
    });
    socket.on('message',({reciever , message})=>{
        io.to(reciever).emit('message',message);
    });
    socket.on('disconnect',()=>{
        console.log('User disconnected');
     });
 })

// server listen
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server listening on http://localhost:${port} `))
