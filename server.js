// Importing the required modules
const WebSocketServer = require('ws');
const path = require('path');
const express = require('express');
const app = express();
 
// Creating a new websocket server
app.set('porto', process.env.PORT || 3000);
const wss = new WebSocketServer.Server({ port: app.get('porto') })

 
// Creating connection using websocket
wss.on("connection", (ws) => {
    console.log("new client connected");
    
    // sending message
    ws.on("message", (data) => {
        console.log(`Client has sent us: ${data}`);
        
        wss.clients.forEach(client => {
            client.send(`A mensagem: "${data}" foi recebida com sucesso!`);
        });       
    });

    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        console.log("Cliente disconectado!");
    });

    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});

console.log(`The WebSocket server is running on port: ${app.get('porto')}`);
