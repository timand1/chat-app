import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './home.scss'
import UserChats from '../../components/userChats/userChats';
import Messages from '../../components/messages/messages';
import Input from '../../components/input/input';
import { doc } from 'firebase/firestore';
import { db } from '../../firebase';
import Search from '../../components/search/search';
import Sidebar from '../../components/sidebar/sidebar';
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
  const [err, setErr] = useState<boolean>(false)
  const [chat, setChat] = useState<ChatProps | null>(null)
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(doc(db, "users", user.uid));
        navigate('/')
        // console.log(user);
        const uid = user.uid;
      } else {
        navigate('/login')
      }
    });
  }, [])


  const handleSignOut = () => {
    signOut(auth).then(() => {
      setErr(false)
    }).catch((error) => {
      setErr(true)
    });
  }

  const handleChat: (userChat: ChatProps) => void = (userChat) => {
    setChat(userChat)
  }

  return (
    <div className="home">
      {/* <h2>{auth.currentUser?.displayName}</h2>
      <h2>{auth.currentUser?.email}</h2> */}
      <button onClick={handleSignOut}>Sign Out</button>
      {err && <p>Something went wrong</p>}
      <Sidebar handleChat={handleChat} />
      <UserChats chat={chat} />
    </div>
  )
}

export default Home
