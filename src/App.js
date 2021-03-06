import './App.css';
import {Route, Redirect} from 'react-router-dom'
import {useEffect, useContext} from 'react'
import axios from 'axios'
import {UserContext} from './Context/UserContext'
import SignInSide from './Pages/LoginPage'

import SignUp from './Pages/SignupPage';
import ChessPage from './Pages/ChessPage';
import HomePage from './Pages/HomePage'
import PrimarySearchAppBar from './Components/NavBar';
import ProfilePage from './Pages/ProfilePage';
import LeaderBoard from './Pages/Leaderboard';


function App() {
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
    <div className="App">
      <PrimarySearchAppBar />
      <Route exact path="/home">
        <HomePage />
      </Route>
      <Route exact path="/login">
        {user ? 
          <Redirect to="/home" />
        :
          <SignInSide />
        }
      </Route>
      <Route exact path="/register">
        {user ? 
          <Redirect to="/home" />
        :
          <SignUp />

          
        }
      </Route>
      <Route exact path="/profile">
        {user ? 
            <ProfilePage />
        :
            <Redirect to="/home" /> 
          
        }
      </Route>
      <Route exact path="/game">
        <ChessPage />
      </Route>
      
      <Route exact path="/leaderboard">
        <LeaderBoard />
      </Route>

    </div>
  );
}

export default App;
