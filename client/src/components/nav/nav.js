import React from 'react'
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core'
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
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
    }

    return(
        <>
        <ThemeProvider theme={theme}>
        { user?
            <AppBar position="static" className='nav-appbar' color="primary" elevation={1}>
                <Toolbar className='nav-toolbar'>
                    <div className='nav-brand-group'>
                        <MailOutlineIcon className='nav-icon' fontSize='large'/>
                        <Typography className='nav-brand' variant="h6"> Charat!</Typography>
                    </div>
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