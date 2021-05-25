import React, { Component, useState } from "react";
import socketIOClient from "socket.io-client";

import WithMoveValidation from "./ChessIntergration";

const ENDPOINT = "http://127.0.0.1:3001";

const Demo = () => {
    const [players, setPlayers] = useState([1,2,3,4])
    const [response, setResponse] = useState("");
    
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    const socketConnect = () => {
        socket.on("connection", data => {
            setResponse(data);
        });

        let player1 = "DiddySmooth"
        let roomId = 10
        socket.emit("joined", player1, roomId, ack => {socket.send(player1)})

        socket.on('full', function (msg) {
            if(roomId == msg)
            window.location.assign(window.location.href+ 'full.html');
        });
      
    }



    return (
      <div>
        <div style={boardsContainer}>
          <WithMoveValidation />
        </div>
        <button onClick={ () => {socketConnect()}}>Click me</button>
      </div>
    );
}

export default Demo;

const boardsContainer = {
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexWrap: "wrap",
  width: "100vw",
  marginTop: 30,
  marginBottom: 50
};
