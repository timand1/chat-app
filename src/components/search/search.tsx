import React, { useContext, useState, KeyboardEvent } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth } from "firebase/auth";

type User = {
    displayName: string
    uid: string
    photoURL: string
  }
  type ChatProps = {
    chatId : string
    user : User
  }
  
  type SearchProps = {
    handleChat: (userChat : ChatProps) => void;
  }
function Search(props: SearchProps) {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [err, setErr] = useState(false);

  const auth = getAuth()
  const { currentUser } = auth;

  const handleSearch = async () => {
    console.log(username);
    
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        setUser(doc.data() as User);        
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e:KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    
    e.key == "Enter" ? handleSearch() : null
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser!.uid > user!.uid
        ? currentUser?.uid + user!.uid
        : user?.uid + currentUser!.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser!.uid), {
            [combinedId + ".userInfo"]: {
            uid: user?.uid,
            displayName: user?.displayName,
            photoURL: user?.photoURL,
        },
        [combinedId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", user!.uid), {
        [combinedId + ".userInfo"]: {
            uid: currentUser?.uid,
            displayName: currentUser?.displayName,
            photoURL: currentUser?.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
      if(user) {
        const chatter: ChatProps = {
        chatId : combinedId,
        user: {
            displayName : user.displayName,
            uid : user.uid,
            photoURL : user.photoURL
        }
    }
        props.handleChat(chatter)
    }

    } catch (err) {console.log(err);
    }

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={(e) => { handleKey(e) }}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;