import React, { Component, useState } from "react";
import socketIOClient from "socket.io-client";

import WithMoveValidation from "./ChessIntergration";

const ENDPOINT = "http://127.0.0.1:3001";

const Demo = () => {

    const [response, setResponse] = useState("");

    const socketConnect = () => {
      const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
      socket.on("FromAPI", data => {
        setResponse(data);
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
