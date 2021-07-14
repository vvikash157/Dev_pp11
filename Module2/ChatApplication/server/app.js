const express = require("express");
const { Server } = require("socket.io");
// server is created !!!
const app = express();
const http = require('http');
const server = http.createServer(app);

const io = new Server(server);

//app.use(express.json());
app.use(express.static("public"));

    // app.use(express.static("public"));
    let userList=[];

    io.on("connection" , function(socket) {
        console.log(socket.id +"!!!connected");
        
        socket.on("userConnected",function(username) {
           let userObj={id : socket.id , username : username}; 
            userList.push(userObj);
            console.log(userList);

            socket.emit("online-list" , userList);
            
            socket.broadcast.emit("join", userObj);
        })


        socket.on("chat",function (chatObj) {
            socket.broadcast.emit("chatLeft" , chatObj);
        })

        
        socket.on("disconnect", function() {
         let leftUserObj;
         let remainingUser=userList.filter(function (userObj) {
             if(userObj.id == socket.id){
                 leftUserObj=userObj;
                 return false;
             }
             return true;
         })
            userList=remainingUser;
            socket.broadcast.emit("leave",  leftUserObj);
        })

    })
   
    server.listen(5500 , function(){
        console.log("server started at 5500");
    })