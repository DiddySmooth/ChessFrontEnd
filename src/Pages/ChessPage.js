
import React, { Component, useState, useContext, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import WithMoveValidation from "./ChessIntergration";
import { UserContext } from '../Context/UserContext'
import { SentimentDissatisfiedRounded } from "@material-ui/icons";
const ENDPOINT = "http://127.0.0.1:3001";
const Demo = () => {
    let [players, setPlayers] = useState([1,2,3,4])
    const [response, setResponse] = useState("");
    const [play, setPlay] = useState(true)
    const [fen, setFen] = useState(null)
    const [updateBoard, setUpdateBoard] = useState(null)
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });
    const {userState} = useContext(UserContext)
    const [user, setUser] = userState
    console.log(user)
    return (
      <div>
        <div style={boardsContainer}>
          <WithMoveValidation setFen={setFen} test="test" updateBoard={updateBoard} />
        </div>
        {/* <Button onClick={ () => {createOrJoin()}}>Click me</Button>
        <Button onClick={ () => {sendFen()}}>Send</Button> */}
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