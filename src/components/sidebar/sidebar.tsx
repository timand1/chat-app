import Chats from "../chats/chats";
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

type SidebarProps = {
    handleChat: (userChat : ChatProps) => void;
  }

function Sidebar(props: SidebarProps) {

  return (
    <div className="sidebar">
      <Search handleChat={props.handleChat}/>
      <Chats handleChat={props.handleChat} />
    </div>
  );
};

export default Sidebar;