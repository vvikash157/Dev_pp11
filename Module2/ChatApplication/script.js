// const { Socket } = require("socket.io");

let chatInput=document.querySelector(".chat-input");
let chatWindow=document.querySelector(".chat-window");
let myName=document.querySelector(".me .user-name");
let username=prompt("enter your name");
myName.textContent=username;


 chatInput.addEventListener("keypress",function (e) {
             console.log(e);       
             if(e.key=="Enter"){
                
                let chatDiv=document.createElement("div");
                chatDiv.classList.add("chats");
                chatDiv.classList.add("right");
                chatDiv.textContent=username+" : "+chatInput.value;
                chatWindow.append(chatDiv);
                Socket.emit("chats", {username , chats:chatInput.value});
                chatInput.value="";
            }
 })