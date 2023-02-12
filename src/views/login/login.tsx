import { useEffect, useState } from 'react'
import './login.scss'
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, signInWithEmailAndPassword  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
        navigate('/login')
        console.log(user);
        const uid = user.uid;
      } else {
        setLoggedIn(false)
      }
    });
  }, [])

  const handleSignOut = () => {
    signOut(auth).then(() => {
      
      setLoggedIn(false)
    }).catch((error) => {
      // An error happened.
    });
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);      
    } catch (err) {
      console.log(err);
      
    }
  };

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(error);
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }
  return (
    <div className="login-page">
      <div className='login-image'>
        <img src="ngnfinimghär" alt="" />
        <h3>Chat Title</h3>
        <p>Nice text</p>
      </div>
      <div className="login">
        <h1>Logo</h1>
        <h2>Chat Circuit</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <div className="input-container">
              <label htmlFor="userName">Email</label>
              <input required type="text" name='userName' />
            </div>
            <div className="input-container">
            <label htmlFor="password">Password</label>
              <input required type="text" name='password' />
            </div>
          </section>
            <input className='btn' type="submit" value="Login" />
        </form>
        <button className='btn btn-google' onClick={signInWithGoogle}>Sign in with Google</button>
        <p>Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span></p>
      </div>

      {loggedIn && 
      <button onClick={handleSignOut}>Sign Out</button>
    }
    {/* <p>{auth.currentUser?.displayName}</p>
    <img style={{width : '100px', height : '100px'}} src={auth.currentUser?.photoURL!} alt="" /> */}
    </div>
  )
}

export default Login
