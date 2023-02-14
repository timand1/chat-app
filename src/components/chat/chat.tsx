import { getAuth } from "firebase/auth";

function Chat() {
    const auth = getAuth();
    return (
      <div className="chat">
        <div className="chatInfo">
          <span>{auth.currentUser?.displayName}</span>
          <div className="chatIcons">

          </div>
        </div>
        {/* <Messages />
        <Input/> */}
      </div>
    );
  };
  
  export default Chat;