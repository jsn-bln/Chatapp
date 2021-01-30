import React, {useState} from 'react'
import './homepage.css'
import {Button} from '@material-ui/core'
import Chat from '../chat/chat'
import Nav from '../nav/nav'
import {TextField, IconButton} from '@material-ui/core'
import SendIcon from '@material-ui/icons/Send';

import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState} from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import moment from 'moment'
require('dotenv').config()


firebase.initializeApp({
    apiKey: "AIzaSyBGjNxK9uDHvhAXh4sB0YbgJO3_RFtTh1E",
    authDomain: "chatapp-e5ab5.firebaseapp.com",
    projectId: "chatapp-e5ab5",
    storageBucket: "chatapp-e5ab5.appspot.com",
    messagingSenderI: "828050009595",
    appId: "1:828050009595:web:6f5a40555d02d6b501af5e",
    measurementId: "G-XGF5GLB931"
})
console.log(process.env.apiKey)

const auth = firebase.auth();
const firestore = firebase.firestore();

const Homepage = () => {
    const [user] = useAuthState(auth);
    const [message, setMessage] = useState('')
    const messagesRef = firestore.collection('messages');
    const query = messagesRef.orderBy('createdAt').limit(1000);
    const [messages] = useCollectionData(query, { idField: 'id' });
    const date = moment().format('LLL');

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((res) => {
            console.log(res.user.displayName, res.user.email, res.user.photoURL)
            localStorage.setItem('account_id',res.user.uid)

            
        }).catch((error) => {
            console.log(error.message + "error")
        })
    }
    
    const sendMessage = async () => {
        
    const { uid, photoURL, displayName } = auth.currentUser;

    await messagesRef.add({
      text: message,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      displayName,
      date
      
    })
    setMessage('')
    }
    return(
            <>
                {
                user?
                <>
                <Nav />
                <div className="border">
                    <Chat messages={messages} img={auth.currentUser.photoURL} name={auth.currentUser.displayName}/>
                    <div className="chat-action">
                        <TextField className="chat-textfield" value={message} onChange={e => setMessage(e.target.value)} 
                        variant="outlined" placeholder="Enter message"/>
                        <IconButton disabled={!message} onClick={sendMessage} className="chat-sendbtn" color="primary" component="span">
                        <SendIcon fontSize="large"/>
                        </IconButton>    
                    </div>
                </div>
                </>

                :
                <>
                <Nav/>
                <div className='homepage-container'>
                    <h1 className="homepage-hero">Talk with strangers online!</h1>
                    <h3 className="homepage-text">Join random conversations all over the globe anonymously!</h3>
                    <Button className="homepage-btn" onClick={signInWithGoogle}> Sign in now!</Button>
                </div>
                </>
                
            }
            </>
     
    )
}

export default Homepage