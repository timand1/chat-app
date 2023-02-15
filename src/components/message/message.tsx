import './message.scss';

import { getAuth } from "firebase/auth";
type MsgProp = {
    date: { 
        nanoseconds : number
        seconds :number
    }
    id : string
    senderId : string
    text: string
  }

type MessageProp = {
    msg: MsgProp
}
function Message(props: MessageProp) {
    const auth = getAuth();
    const { date, id, senderId, text } = props.msg
    console.log(id);
    
    const offset = new Date().getTimezoneOffset() * 60
    const msgDate = (new Date((date.seconds - offset) * 1000 ))
    console.log(msgDate.toString().slice(0, 25));
    
    return (
      <div className={senderId == auth.currentUser?.uid ? 'sent' : 'recieved'} >
        <p>{msgDate.toString().slice(0, 24)}</p>
        <p>{text}</p>
      </div>
    );
  };
  
  export default Message;