import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import mongoConnect from './db/MongoDB.js';
import path from 'path';
import { handleRegister, handleLogin, sendMessage } from './Controller/userController.js'
import { validateSchema, loginValidation } from './Validations/registerValidation.js'
import checkUserToken from './Middelwere/checkUserToken.js'
import validateUser from './Middelwere/checkValidation.js'

// server
dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// config dependency
app.use(bodyParser.json());
app.use(express.json());
mongoConnect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/chatDataBase');

// html connetion
app.use(express.static(path.resolve('./public')))
app.get('/user', (req, res) => {
    res.sendFile("/public/index.html");
})

// routes
app.route('/user/register').post(validateUser(validateSchema), handleRegister);
app.route('/user/login').post(validateUser(loginValidation), handleLogin);
app.route('/user/chat').post(checkUserToken, sendMessage);


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


const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server listening on ${port} `))
