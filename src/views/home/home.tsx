import './home.scss'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserChats from '../../components/userChats/userChats';
import Sidebar from '../../components/sidebar/sidebar';
import Navbar from '../../components/navbar/navbar';

type User = {
  displayName: string
  uid: string
  photoURL: string
}
type ChatProps = {
  chatId : string
  user : User
}

function Home() {
  const navigate = useNavigate();  
  const [chat, setChat] = useState<ChatProps | null>(null)
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
        const uid = user.uid;
      } else {
        navigate('/login')
      }
    });
  }, [])

  const handleChat: (userChat: ChatProps) => void = (userChat) => {
    console.log(userChat);
    
    setChat(userChat)
  }

  return (
    <div className="home">
      <Navbar />
      <div className='main-content'>
        <Sidebar handleChat={handleChat} activeChat={chat?.chatId} />
        {chat &&
          <UserChats chat={chat} />
        }
      </div>
    </div>
  )
}

export default Home
