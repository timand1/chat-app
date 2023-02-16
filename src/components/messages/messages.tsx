import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { db } from "../../firebase";
import Message from "../message/message";
import './messages.scss';

type User = {
    displayName: string
    uid: string
    photoURL: string
  }
  type ChatProps = {
    chatId : string
    user : User
  }
  
  type MessagesProps = {
    chat : ChatProps | null
  }

  type MsgProp = {
    date: { 
        nanoseconds : number
        seconds :number
    }
    id : string
    senderId : string
    text: string
  }

function Messages(props: MessagesProps) {
    const {chat} = props
    const auth = getAuth();
    const [messages, setMessages] = useState<MsgProp[]>([]);
    const scrollPoint = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
      if(chat) {
          const unSub = onSnapshot(doc(db, "chats", chat.chatId), (doc) => {               
            doc.exists() && setMessages(doc.data().messages);
          });
      
          return () => {
            unSub();
          };
      }
    }, [chat?.chatId]);
    
    useEffect(() => {
      scrollPoint.current ? scrollPoint.current.scrollIntoView({ behavior: 'smooth' }) : ''
    }, [messages])
    
      const msgEl = messages.map(msg => <Message key={msg.id} msg={msg} />)
    
    return (
      <div className="messages">
        {msgEl}
        <span ref={scrollPoint}></span>
      </div>
    );
  };
  
  export default Messages;