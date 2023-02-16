import { getAuth } from "firebase/auth";
import { v4 as uuid } from "uuid";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { useState, KeyboardEvent } from "react";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import './input.scss';

type User = {
  displayName: string
  uid: string
  photoURL: string
}
type ChatProps = {
  chatId : string
  user : User
}

type InputProps = {
  chat : ChatProps | null
}

function Input(props: InputProps) {
  const { chat } = props
    const auth = getAuth();
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);

    const handleEnter = (e:KeyboardEvent<HTMLInputElement>) => {   
      e.key == "Enter" ? handleSend() : null
    };

    const handleSend: () => Promise<void> = async () => {
      console.log(auth.currentUser);
      
      if(chat && auth.currentUser) {
        await updateDoc(doc(db, "chats", chat.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: auth.currentUser?.uid,
            date: Timestamp.now(),
          }),
        });
        await updateDoc(doc(db, "userChats", auth.currentUser.uid), {
          [chat?.chatId + ".lastMessage"]: {
            text,
          },
          [chat?.chatId + ".date"]: serverTimestamp(),
        });
        
        await updateDoc(doc(db, "userChats", chat!.user.uid), {
          [chat?.chatId + ".lastMessage"]: {
            text,
          },
          [chat?.chatId + ".date"]: serverTimestamp(),
        });
        
        setText("");
        setImg(null);
      }
    }
    return (
      <div className="input">
        <input
          type="text"
          placeholder="Type something..."
          onChange={(e) => setText(e.target.value)}
          onKeyUp={(e) => handleEnter(e)}
          value={text}
        />
        <div className="send">
          {/* <img src={Attach} alt="" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt="" />
          </label> */}
          <FontAwesomeIcon onClick={handleSend} icon={faPaperPlane} />
        </div>
      </div>
    );
  };
  
  export default Input;