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
    const { date, senderId, text } = props.msg

    const offset = new Date().getTimezoneOffset() * 60
    const msgDate = (new Date((date.seconds) * 1000 ))    
    return (
      <div className={senderId == auth.currentUser?.uid ? 'message sent' : 'message recieved'} >
        <p className='text-date'>{msgDate.toString().slice(0, 24)}</p>
        <p>{text}</p>
      </div>
    );
  };
  
  export default Message;