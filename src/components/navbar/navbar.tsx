import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebase";
import logo from '../../assets/logo-light.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './navbar.scss';

function Navbar() {
    const [err, setErr] = useState<boolean>(false)

    const handleSignOut = () => {
        signOut(auth).then(() => {
        setErr(false)
        }).catch((error) => {
        setErr(true)
        });
    }

  return (
    <div className="navbar">
        <div className="logo-container">
            <h3>Chat Circuit</h3>
            <img src={logo} alt="" />
        </div>
        <div className="nav-user">
            {auth.currentUser?.photoURL &&
                <img style={{width : '40px', height: '40px'}} src={auth.currentUser?.photoURL} alt="" />
              }
              {!auth.currentUser?.photoURL &&
                <div>
                  <FontAwesomeIcon icon={faUser} />
                </div>
              }
            <p>{auth.currentUser?.displayName}</p>
                  <button onClick={handleSignOut}>Sign Out</button>
        </div>
      {err && <p>Something went wrong</p>}
    </div>
  )
}

export default Navbar