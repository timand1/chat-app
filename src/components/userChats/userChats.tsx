import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Input from "../input/input";
import Messages from "../messages/messages";
import Search from "../search/search";

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

        <Messages chat={props.chat} />
        <Input chat={props.chat} />
      </div>
    );
  };
  
  export default UserChats;