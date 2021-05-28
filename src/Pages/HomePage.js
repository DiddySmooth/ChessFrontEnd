import Container from '@material-ui/core/Container';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import { UserContext } from '../Context/UserContext'
import {useContext, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
const HomePage = () => {
    const useStyles = makeStyles((theme) => ({
        heroContent: {
            padding: theme.spacing(8, 0, 6),
          }
      }))
      const classes = useStyles();

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
            
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Gray Chess
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" component="p">
                    Welcome to GrayChess.com login or create an account to start playing against opponents today.
                    Checkout the video below if you do not know the rules of chess.
                </Typography>
            </Container>
            <iframe 
                width="700" 
                height="394" 
                src="https://www.youtube.com/embed/NAIQyoPcjNM" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>    
    )
}
export default HomePage