import Chats from "../chats/chats";
import Search from "../search/search";
import './sidebar.scss';

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
    activeChat: string | undefined
  }

function Sidebar(props: SidebarProps) {
console.log(props.activeChat);

  return (
    <div className="sidebar">
      <Search handleChat={props.handleChat}/>
      <Chats handleChat={props.handleChat} activeChat={props.activeChat} />
    </div>
  );
};

export default Sidebar;