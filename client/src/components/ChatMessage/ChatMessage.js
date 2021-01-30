import React from 'react'
import './chatmessages.css'
import {Card} from '@material-ui/core'

const ChatMessage = (props) => {
    const user_id = localStorage.getItem('account_id')
    const messageClass = user_id === props.msg.uid ? "sent": "recieved"
    
    return(
        <div className={messageClass}>
            <img className="profile-pic" alt="profile-pic" src={props.msg.photoURL} />
            <div className="message-item">
                <span className="message-sender">{props.msg.displayName}</span>
                <Card className="message-text">{props.msg.text}</Card>
                <span className="message-date">{props.msg.date}</span>
            </div>
            
        </div>
    )
}

export default ChatMessage