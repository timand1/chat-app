import { useEffect, useState } from 'react'
import './login.scss'
import Splitpage from '../../components/splitpage/splitpage';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import googleIcon from '../../assets/google.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [passwordErr, setPasswordErr] = useState<boolean>(false)
  const [emailErr, setMailErr] = useState<boolean>(false)
  const [loginErr, setLoginErr] = useState<boolean>(false)
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

  const handleSignOut = () => {
    signOut(auth).then(() => {
      
      setLoggedIn(false)
    }).catch((error) => {
      // An error happened.
    });
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setPasswordErr(false)
    setMailErr(false)
    setLoginErr(false)
    const email = e.target[0].value;
    const password = e.target[1].value;

    if(password.length < 6) {
      setPasswordErr(true)      
      return
    }
    if(!email.includes('@') || !email.includes('.')) {
      setMailErr(true)
      return
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);      
    } catch (err) {
      setLoginErr(true)
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
      navigate('/')
      console.log(user);
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  const handleMailErr: () => void = () => {
    setLoginErr(false)
    setMailErr(false)
  }

  const handlePasswordErr: () => void = () => {
    setPasswordErr(false)
  }

  return (
    <div className="login-page">
      <Splitpage left={true} />
      <div className="login">
        <img className='logo' src={logo} alt="Chat Circuit Logo" />
        <h2>Chat Circuit</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <div className={emailErr || loginErr  ? 'email-error input-container' : 'input-container'} >
              <input placeholder=' ' required type="text" name='userName' onChange={() => handleMailErr()} />
              <label htmlFor="userName">Email</label>
              <FontAwesomeIcon icon={faAt} />
              {emailErr && 
                <p className="error-text">Email requires @ and ., Ex. name@email.com.</p>
              }
              {loginErr && 
                <p className="error-text">User not found. Check email or sign up.</p>
              }
            </div>
            <div className={passwordErr ? 'password-error input-container' : 'input-container'}>
              <input placeholder=' ' required type={showPassword ? 'text' : 'password'} name='password' onChange={() => handlePasswordErr()} />
              <label htmlFor="password">Password </label>
              {showPassword && 
                <FontAwesomeIcon icon={faEyeSlash} className="display-password" onClick={() => setShowPassword(!showPassword)}/>
              }
              {!showPassword && 
                <FontAwesomeIcon icon={faEye} className="display-password" onClick={() => setShowPassword(!showPassword)}/>
              }
              {passwordErr && 
                <p className="error-text">Password requires atleast 6 characters.</p>
              }
            </div>
          </section>
            <input className='btn' type="submit" value="Login" />
        </form>
        <div className="divider"></div>
        <button className='btn btn-google' onClick={signInWithGoogle}><img src={googleIcon} alt="Google Icon" /> Sign in with Google</button>
        <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
      </div>

      {loggedIn && 
      <button onClick={handleSignOut}>Sign Out</button>
    }
    </div>
  )
}

export default Login
