import Container from '@material-ui/core/Container';
import axios from 'axios'
import Typography from '@material-ui/core/Typography';
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
const LeaderBoard = () => {

    const useStyles = makeStyles((theme) => ({
        heroContent: {
            padding: theme.spacing(8, 0, 6),
          }
    }))
    const classes = useStyles();
    const [users, setUsers] = useState([""])
    const getUserInfo = async () => {
        try {
            let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/leaderboard`)
            console.log(res.data.user)
            setUsers(res.data.user)
            console.log(users)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => { getUserInfo() }, [])

    return (
        <div>
            <Container maxWidth="sm" component="main" className={classes.heroContent}>
            {users.map((user, i) =>
                <Typography key={i} variant="h5" align="center" color="textSecondary" component="p">
                    {` ${user.username}: ${user.elo}`}
                </Typography>
            )}
            </Container>
            
        </div>
    )
}
export default LeaderBoard