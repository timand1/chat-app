import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Input from "../input/input";
import Messages from "../messages/messages";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './userChats.scss';

type User = {
    displayName: string
    uid: string
    photoURL: string
  }
  type ChatProps = {
    chatId : string
    user : User
  }

type UserChatProps = {
    chat : ChatProps | null
  }

function UserChats(props: UserChatProps) {
    const auth = getAuth();
    const { currentUser } = auth;
    const [chats, setChats] = useState([]);
    // console.log(auth.currentUser);
    
    useEffect(() => {
        const getChats = () => {
           
          const unsub = onSnapshot(doc(db, "userChats", auth.currentUser!.uid), (doc) => {
            // setChats(doc.data());
            console.log(doc.data());
            
          });
    
          return () => {
            unsub();
          };
        };
    
        currentUser?.uid && getChats();
      }, [currentUser?.uid]);
    return (
      <div className="userchats">
        <header>
          <h2>{props.chat?.user.displayName}</h2>
          {props.chat?.user.photoURL &&
            <img style={{width : '40px', height: '40px'}} src={props.chat?.user.photoURL} alt="" />
          }
          {!props.chat?.user.photoURL &&
            <div className="no-avatar">
              <FontAwesomeIcon icon={faUser} />
            </div>
          }
        </header>
        <Messages chat={props.chat} />
        <Input chat={props.chat} />
      </div>
    );
  };
  
  export default UserChats;