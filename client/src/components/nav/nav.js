import React from 'react'
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core'
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import MenuOutlinedIcon from '@material-ui/icons/MenuOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import './nav.css'

import firebase from 'firebase/app'
import 'firebase/firestore'
import { useAuthState} from 'react-firebase-hooks/auth'

const Nav = () => {

    const auth = firebase.auth();
    const [user] = useAuthState(auth);
    const theme = createMuiTheme({
        palette: {
          primary: {
              main:'#ffbe0b',
              light: '#f0efeb'
            },
          secondary: {
              main:'#3a86ff'
            }
        }
      });
    
    const chat_name = () => {
        const name = localStorage.getItem('room')
        if(name === 'messages') return "General"
        return name
    }


    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((res) => {
            localStorage.setItem('account_id',res.user.uid)
            
        }).catch((error) => {
            console.log(error.message + "error")
        })
    }

    const signOut = () => {
        auth.signOut();
        localStorage.setItem('account_id','')
        localStorage.setItem('room', 'messages')
    }

    const hamburgerBtn = () => {
        const sidebar = document.querySelector('.sidebar-container')
        const hamburgerBtn = document.querySelector('.hamburger-btn')
        const hamburgerCloseBtn = document.querySelector('.hamburger-close')
        const iconMenu = document.querySelector('.nav-icon-hamburger')
        const iconCloseMenu = document.querySelector('.nav-icon-close')
        sidebar.style.display = "block";
        hamburgerBtn.style.display = "none";
        hamburgerCloseBtn.style.display = "block";
        iconMenu.style.display ="none";
        iconCloseMenu.style.display = "block";
        
    }
    const hamburgerCloseBtn = () => {
        const sidebar = document.querySelector('.sidebar-container')
        const hamburgerBtn = document.querySelector('.hamburger-btn')
        const hamburgerCloseBtn = document.querySelector('.hamburger-close')
        const iconMenu = document.querySelector('.nav-icon-hamburger')
        const iconCloseMenu = document.querySelector('.nav-icon-close')
        sidebar.style.display = "none";
        hamburgerBtn.style.display = "block";
        hamburgerCloseBtn.style.display = "none";
        iconMenu.style.display ="block";
        iconCloseMenu.style.display = "none";
    }


    return(
        <>
        <ThemeProvider theme={theme}>
        { user?
            <AppBar position="static" className='nav-appbar' color="primary" elevation={1}>
                <Toolbar className='nav-toolbar'>
                    <div className='nav-brand-group'>
                        <MailOutlineIcon className='nav-icon' fontSize='large'/>
                        <IconButton  className="hamburger-btn" onClick={hamburgerBtn}>
                            <MenuOutlinedIcon className='nav-icon-hamburger' fontSize='large'/>
                        </IconButton>
                        <IconButton className="hamburger-close" onClick={hamburgerCloseBtn}>
                            <CloseOutlinedIcon className='nav-icon-close' fontSize='large'/>
                        </IconButton>
                        <Typography className='nav-brand' variant="h6"> Charat!</Typography>
                    </div>
                    <div className="nav-room">{chat_name()} room</div>
                    <div className='nav-btn-group'>
                        <Button onClick={signOut} className="nav-btn" color="inherit">Logout</Button>
                    </div>
                </Toolbar>
            </AppBar>     
            :<AppBar position="static" className='nav-appbar' color="transparent" elevation={0}>
                <Toolbar className='nav-toolbar'>
                    <div className='nav-brand-group'>
                        <MailOutlineIcon style={{color: "#f0efeb"}} className='nav-icon' fontSize='large'/>
                        <Typography style={{color: "#f0efeb"}} className='nav-brand' variant="h6"> Charat!</Typography>
                    </div>
                    <div className='nav-btn-group'>
                        <Button style={{color: "#f0efeb"}} onClick={signInWithGoogle} className="nav-btn" color="inherit">Connect</Button>
                    </div>
                </Toolbar>
            </AppBar>

        }
        </ThemeProvider>
        </>
    )
    
}

export default Nav