import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './home.scss'

function Home() {
  const navigate = useNavigate();  
  const [err, setErr] = useState<boolean>(false)
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/')
        console.log(user);
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
  
  return (
    <div className="home">
      <h2>{auth.currentUser?.displayName}</h2>
      <h2>{auth.currentUser?.email}</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      {err && <p>Something went wrong</p>}
    </div>
  )
}

export default Home
