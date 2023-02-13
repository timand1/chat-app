import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './home.scss'

function Home() {
  const navigate = useNavigate();  
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
  
  return (
    <div className="home">
      <h2>{auth.currentUser?.displayName}</h2>
    </div>
  )
}

export default Home
