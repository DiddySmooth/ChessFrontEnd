import logo from './logo.svg';
import './App.css';
import {Route, Redirect} from 'react-router-dom'
import {useEffect, useContext} from 'react'
import axios from 'axios'
import {UserContext} from './Context/UserContext'
import PrimarySearchAppBar from './Components/NavBar';
import SignInSide from './Pages/LoginPage'

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

      <Route exact path="/login">
        {user ? 
          <Redirect to="/home" />
        :
          <SignInSide />
        }
      </Route>
    </div>
  );
}

export default App;
