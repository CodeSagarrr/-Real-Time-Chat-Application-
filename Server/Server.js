import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import bodyParser  from 'body-parser';
import { Server } from 'socket.io';
import mongoConnect  from './db/MongoDB.js';
import {handleRegister , handleLogin} from './Controller/controller.js'
import {validateSchema} from './Validations/registerValidation.js'
import validateUser from './Middelwere/checkValidation.js'

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(express.json());
mongoConnect(process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/chatDataBase');


// routes for server
app.get('/',(req,res)=>{
    res.send('Server is running');
})
app.route('/user/register').post(validateUser(validateSchema),handleRegister);
app.route('/user/login').post(handleLogin);




const port = process.env.PORT || 8000;
server.listen(port , () => console.log(`server listening on ${port} `))