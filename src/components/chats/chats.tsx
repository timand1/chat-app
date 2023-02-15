import { getAuth } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";


type Chat = {
    lastMessage: any;
    id: string
    text : string
    senderId: string
    date: number
    userInfo : User
}

type User = {
    displayName: string
    uid: string
    photoURL: string
  }
  type ChatProps = {
    chatId : string
    user : User
  }

type ChatsProps = {
    handleChat: (userChat : ChatProps) => void;
  }
function Chats(props: ChatsProps) {
    const auth = getAuth();
  const [chats, setChats] = useState<Chat[]>([]);


  useEffect(() => {
    const getChats = () => {
        if(auth.currentUser) {
            const unsub = onSnapshot(doc(db, "userChats", auth.currentUser.uid), (doc) => {
                setChats(doc.data() as Chat[]);
            });
            
            return () => {
                unsub();
            };
        }
    };

    auth.currentUser?.uid && getChats();
  }, [auth.currentUser?.uid]);

  const handleSelect = (u:any) => {
    console.log(u);
    // console.log(auth.currentUser);
    
    if(auth.currentUser) {
    const combinedId =
        auth.currentUser.uid > u.userInfo.uid
            ? auth.currentUser?.uid + u!.userInfo.uid
            : u?.userInfo.uid + auth.currentUser!.uid;
    
    const chatter: ChatProps = {
        chatId : combinedId,
        user: u.userInfo
    }
    // console.log(chatter);
    
    props.handleChat(chatter)
}

    
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1])}
        >
          <img style={{width : '40px', height: '40px'}} src={chat[1].userInfo?.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo?.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;