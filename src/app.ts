
const express = require('express');
import db from './db/db'
import route from './routes/index'
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { message } from './model/messages.model';
import conversationConller from './controller/conversation.conller';
import userOnline from './controller/user-online.controller';


const cors = require("cors");
const app = express();
app.use(
    cors(
        {
            origin:["http://localhost:4200", "http://localhost:3001", "https://app-chat-vch.herokuapp.com"]
        }
    )
)
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT  || 3000;

const httpServer = createServer(app);
const io = new Server(httpServer, { 
    cors: {
        origin: ["http://localhost:4200", "http://localhost:3001", "https://app-chat-vch.herokuapp.com"],
      }
});

db();
const adminNamespace = io.of("/admin");

adminNamespace.on("connection", (socket)=>{
    console.log(socket.id);
})  


adminNamespace.use((socket, next) => {
    // ensure the user has sufficient rights
    if(socket.handshake.auth.token)
    {
        console.log("token", socket.handshake.auth.token);

    }
    next();
  });




io.on("connection",  async(socket) => {

    
   socket.on("send-messages", async(messages: message)=>{
       const body = {
           ...messages
       }
       try {
            const check = await conversationConller.create(body);
            if(check)
            {
                socket.broadcast.to(messages.channelID || "").emit("receive-messages", messages);     

            }
       } catch (error) {
           console.log(error);
       }
      
   })

   
   socket.on("get_user_online", async(channelID: string, callback)=>{
        try {
            const user_online = await userOnline.getUserOnline(channelID);
            callback({
                status: "ok"
            })
            io.to(channelID).emit("received_user_online", user_online);
        } catch (error) {
            console.log("error", error);
        }
   })



   socket.on("join-room", async(userID, username, channelID, callback)=>{
       socket.join(channelID);
       try {
        const message = await conversationConller.getChannelConversation(channelID);
        await userOnline.Create(userID, username, channelID, socket.id);
        callback({
            status: "ok"
          });
        io.to(channelID).emit("received-room-messages", message);      
       } catch (error) {
           console.log(error)
       } 
   })


   socket.on('disconnected', async(userID: string, channelID: string, callback)=>{
        try {
            const user_online = await userOnline.userOfline(userID, channelID);
            callback({
                status: user_online
            })
        } catch (error) {
            console.log(error);
        }
   });

   
socket.on("disconnect", async() => {
    try {
        await userOnline.userOffbrowser(socket.id);
        io.emit('user-off-browser', socket.id);
    } catch (error) {
        console.log(error);
    }


  });

});


httpServer.listen(port, ()=>{
    console.log(`Server listen in ${port}`)
   
})



route(app)