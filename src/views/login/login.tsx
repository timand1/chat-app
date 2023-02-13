import { useState } from 'react'
import './login.scss'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword  } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import googleIcon from '../../assets/google.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faFaceLaughBeam, faAt, faLock } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate();
  const auth = getAuth();


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
        <div className='chatbubbles'>
        <FontAwesomeIcon className='emoji' icon={faFaceLaughBeam} />
        <FontAwesomeIcon className='comments' icon={faComments} />
        <FontAwesomeIcon className='emoji' icon={faFaceLaughBeam} />
        <FontAwesomeIcon className='comments' icon={faComments} />
        <FontAwesomeIcon className='emoji' icon={faFaceLaughBeam} />
        <FontAwesomeIcon className='comments' icon={faComments} />
          <div className="chatbubble-left">
              <p>Chat anytime</p>
          </div>
          <div className="chatbubble-right">
              <p>Anytime?</p>
          </div>
          <div className="chatbubble-left">
            <p>And anywhere!</p>
          </div>
        </div>
          <div className="divider"></div>
        <div className="text-container">
          <h2>Effortless Communication</h2>
          <p>Intuitive design, straightforward features simplify communication</p>
        </div>
      </div>
      <div className="login">
        <img className='logo' src={logo} alt="Chat Circuit Logo" />
        <h2>Chat Circuit</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <div className="input-container">
              <input placeholder=' ' required type="text" name='userName' />
              <label htmlFor="userName">Email</label>
              <FontAwesomeIcon icon={faAt} />
            </div>
            <div className="input-container">
              <input placeholder=' ' required type={showPassword ? 'text' : 'password'} name='password' />
              <label htmlFor="password">Password </label>
              <FontAwesomeIcon icon={faLock} />
            </div>
          </section>
            <input className='btn' type="submit" value="Login" />
        </form>
        <div className="divider"></div>
        <button className='btn btn-google' onClick={signInWithGoogle}><img src={googleIcon} alt="Google Icon" /> Sign in with Google</button>
        <p>Don't have an account? <span onClick={() => navigate('/register')}>Sign Up</span></p>
      </div>

      {loggedIn && 
      <button onClick={handleSignOut}>Sign Out</button>
    }
    </div>
  )
}

export default Login
