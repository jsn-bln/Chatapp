import React,{useEffect,useRef} from 'react'
import './chat.css'
import ChatMessage from '../ChatMessage/ChatMessage'




const Chat = (props) => { 
    const space = useRef();
    const messages = props.messages && props.messages.map(msg => {
        return <ChatMessage key={msg.id} msg={msg}/>
        })
    
    useEffect(() => {
        space.current.scrollIntoView({ behavior: 'smooth' });
    },[messages])
    
    return(
        
    <div className='chat-container'>
        <div className="chat-messages">
            {messages}
            <div ref={space}></div>
        </div>
        
    </div>

    )
}

export default Chat