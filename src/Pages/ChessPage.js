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

    const socketConnect = () => {
        socket.on("connection", data => {
            console.log(data)
            setResponse(data)
        })

        let color
        let player1 = user.name
        let roomId = 1
        socket.emit("joined", player1, roomId, ack => {socket.send(player1)})

        socket.on('full', function (msg) {
            if(roomId == msg)
            console.log("Room full")
        })

        socket.on('play', function (msg) {
            if (msg == roomId) {
                setPlay(false)
                console.log("Game in progress")
            }
            // console.log(msg)
        })
        socket.on('message', function (msg) {
            setUpdateBoard(msg)
            console.log("Received", msg)
        })
    }
    const sendFen = () => {
        console.log("Sent", fen)
        socket.emit("message", fen, ack => {socket.send(fen)})

    }

    useEffect(()=>{
        sendFen()
    },[fen])
    return (
      <div>
        <div style={boardsContainer}>
          <WithMoveValidation setFen={setFen} test="test" updateBoard={updateBoard} />
        </div>
        <Button onClick={ () => {socketConnect()}}>Click me</Button>
        <Button onClick={ () => {sendFen()}}>Send</Button>
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
