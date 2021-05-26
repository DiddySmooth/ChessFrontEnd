import React, { Component, useState, useContext } from "react";
import socketIOClient from "socket.io-client";
import Button from '@material-ui/core/Button';
import WithMoveValidation from "./ChessIntergration";
import { UserContext } from '../Context/UserContext'

const ENDPOINT = "http://127.0.0.1:3001";

const Demo = () => {
    let [players, setPlayers] = useState([1,2,3,4])
    const [response, setResponse] = useState("");
    const [play, setPlay] = useState(true)
    const socket = socketIOClient(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

    const {userState} = useContext(UserContext)
    const [user, setUser] = userState

    console.log(user)

    const socketConnect = () => {
        socket.on("connection", data => {
            setResponse(data)
        })

        let color
        let player1 = "DiddySmooth"
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
    }
    


    return (
      <div>
        <div style={boardsContainer}>
          <WithMoveValidation />
        </div>
        <Button onClick={ () => {socketConnect()}}>Click me</Button>
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
