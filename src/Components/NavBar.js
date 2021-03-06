import React from 'react';
import {useContext} from 'react'
import { fade, makeStyles } from '@material-ui/core/styles';
import {Redirect} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { UserContext } from '../Context/UserContext'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginLeft: 50,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [redirectLogin, setRedirectLogin] = React.useState(false)
  const [redirectRegister, setRedirectRegister] = React.useState(false)
  const [redirectGame, setRedirectGame] = React.useState(false)
  const [redirectProfile, setRedirectProfile] = React.useState(false)
  const [redirectLeaderBoard, setRedirectLeaderBoard] = React.useState(false)

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const {userState} = useContext(UserContext)
  const [user, setUser] = userState


  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLoginClick = () => {
    setRedirectLogin(true)
    setRedirectRegister(false)
    setRedirectGame(false)
    setRedirectLeaderBoard(false)
    console.log("Login")
    
  }
  const handleSignUpClick = () => {
    setRedirectRegister(true)
    setRedirectLogin(false)
    setRedirectGame(false)
    setRedirectLeaderBoard(false)
    console.log("Register")
  }
  const handleGameClick = () => {
    setRedirectRegister(false)
    setRedirectLogin(false)
    setRedirectGame(true)
    setRedirectLeaderBoard(false)
    console.log("Game")
  }
  const handleProfileClick = () => {
    setRedirectRegister(false)
    setRedirectLogin(false)
    setRedirectGame(false)
    setRedirectProfile(true)
    setRedirectLeaderBoard(false)
    console.log("Profile")
  }
  const handleLogoutClick = () => {
    localStorage.removeItem("userId")
    console.log("logout")
  }
  const handleLeaderBoardClick = () => {
    setRedirectRegister(false)
    setRedirectLogin(false)
    setRedirectGame(false)
    setRedirectProfile(false)
    setRedirectLeaderBoard(true)
    console.log("Leaderboard")
  }
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
            <MenuItem onClick={ () =>{handleMenuClose();handleProfileClick()}}>Profile</MenuItem>
            <MenuItem onClick={ () =>{handleMenuClose();handleLogoutClick()}}>Logout</MenuItem>
            <MenuItem onClick={ () =>{handleMenuClose();handleLoginClick()}}>Login</MenuItem>
            <MenuItem onClick={ () =>{handleMenuClose();handleSignUpClick()}}>Register</MenuItem>
            <MenuItem onClick={ () =>{handleMenuClose();handleGameClick()}}>Play</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography onClick={ () =>handleGameClick()} className={classes.title} variant="h6" noWrap>
            Gray Chess
          </Typography>
          <Typography onClick={ () =>handleLeaderBoardClick()} className={classes.title} variant="h6" noWrap>
            LeaderBoard
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 0 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 0 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {redirectLogin ?
        <Redirect to="/login" />
      :
        <Redirect to="/home" />

      }
      {redirectGame ?
        <Redirect to="/game" />
      :
        <Redirect to="/home" />

      }
      {redirectRegister ?
        <Redirect to="/register" />
      :
        <Redirect to="/home" />

      }
      {redirectProfile ?
        <Redirect to="/profile" />
      :
        <Redirect to="/home" />

      }
      {redirectLeaderBoard ?
        <Redirect to="/leaderboard" />
      :
        <Redirect to="/home" />

      }
    </div>
    
  );
}