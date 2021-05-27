import React, { Component, useState, useContext, useEffect } from "react";
import axios from 'axios'
import {Redirect} from 'react-router-dom'
import WithMoveValidation from "./ChessIntergration";
import { UserContext } from '../Context/UserContext'
const ENDPOINT = "http://127.0.0.1:3001";
const Demo = () => {
    const [fen, setFen] = useState(null)
    const [updateBoard, setUpdateBoard] = useState(null)
    const {userState} = useContext(UserContext)
    const [user, setUser] = userState
    const userId = localStorage.getItem('userId')
    const getUserInfo = async () => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/info`, {
            headers: {
                Authorization: userId
            }
        })
        if (res.data.user) {
            setUser(res.data.user)
            console.log(res.data.user)
        }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getUserInfo() }, [])

    return (
      <div>
        <div style={boardsContainer}>
            {user ? 
                <WithMoveValidation setFen={setFen} test="test" updateBoard={updateBoard} user={user.username} />
            :
                <Redirect to="/home" />
            }
          
        </div>
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