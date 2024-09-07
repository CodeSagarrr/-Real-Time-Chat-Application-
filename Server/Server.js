import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser from 'body-parser';
import { Server } from 'socket.io';
import mongoConnect from './db/MongoDB.js';
import path from 'path';
import { handleRegister, handleLogin , handleLogout , newConversation ,getUserConversation ,addUserChat , getUserChat} from './Controller/userController.js';
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


// EJS connetion
app.use(express.static(path.resolve('./public')))
app.get('/', (req, res) => {
    res.sendFile("/public/index.html");
})




// routes connections
app.route('/user/register').post(validateUser(validateSchema), handleRegister);
app.route('/user/login').post(validateUser(loginValidation), handleLogin);
app.route('/user/logout').get(handleLogout)
app.route('/user/conversation').post(newConversation)
app.route('/user/conversation/:userId').get(getUserConversation)
app.route('/user/chatuser').post(checkUserToken, addUserChat);
app.route('/user/chatuser/:chatId').get(getUserChat);
app.get('/user/chat',checkUserToken,(req,res)=>{
  res.json({ user: req.user, message: "Access granted to chat data" });
})

// socket connections
io.on('connection',(socket)=>{
  
   
})

// server listen
const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`server listening on http://localhost:${port} `))
