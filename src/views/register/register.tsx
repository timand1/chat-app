import React, { useEffect, useState } from "react";
import './register.scss';
// import Add from "../img/addAvatar.png";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged } from "firebase/auth";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faFaceLaughBeam, faAt, faEye, faEyeSlash, faUser, faImage } from "@fortawesome/free-solid-svg-icons";
import Splitpage from "../../components/splitpage/splitpage";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [usernameErr, setUsernameErr] = useState<boolean>(false)
  const [passwordErr, setPasswordErr] = useState<boolean>(false)
  const [avatarAdded, setAvatarAdded] = useState<string>('')
  const [emailErr, setMailErr] = useState<boolean>(false)
  const [loginErr, setLoginErr] = useState<boolean>(false)
  
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
  
  const handleSubmit = async (e:any) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    setPasswordErr(false)
    setMailErr(false)
    setLoginErr(false)
    setUsernameErr(false)
    
    
    if(password.length < 6) {
      setPasswordErr(true)      
      return
    } else if(!email.includes('@') || !email.includes('.')) {
      setMailErr(true)
      return
    } else if(displayName.length < 2) {
      setUsernameErr(true)
      return
    }
    try {
      //Create user
      
      const auth = getAuth()
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);
      
      await uploadBytesResumable(storageRef, file).then(() => {
        console.log(displayName);
        getDownloadURL(storageRef).then(async (downloadURL) => {
          console.log(downloadURL);
          // try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          // } catch (err) {
          //   console.log(err);
          //   setErr(true);
          //   setLoading(false);
          // }
        });
      });
    } catch (err) {
      
      setErr(true);
      setLoading(false);
    }
  };
  const handleMailErr: () => void = () => {
    setLoginErr(false)
    setMailErr(false)
  }

  const handlePasswordErr: () => void = () => {
    setPasswordErr(false)
  }

  const handleImage: (e:any) => void = (e) => {

    const avatar = e.target.value.substring(12)
    setAvatarAdded(avatar)
  }

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="title-container">
          <h2 className="logo">Chat Circuit</h2>
          <p className="title">Register</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
              <input placeholder=' ' required type="text" name='displayName' />
              <label htmlFor="displayName">Display name </label>
                <FontAwesomeIcon icon={faUser} className="display-password"/>
              {usernameErr && 
                <p className="error-text">Display name requires atleast 2 characters.</p>
              }
          </div>
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
          <div className={avatarAdded.length > 0 ? 'input-image image-added' : 'input-image'}>
            <input style={{ display: "none" }} type="file" id="file" onChange={(e) => handleImage(e)} />
            <label htmlFor="file">
              <span>{avatarAdded.length > 0 ? avatarAdded : 'Avatar'}</span>
              <FontAwesomeIcon icon={faImage} />
            </label>
          </div>
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
      <Splitpage left={false} />
    </div>
  );
};

export default Register;