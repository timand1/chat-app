import "./errorpage.scss";
import { useNavigate } from "react-router-dom";

function Errorpage() {
  const navigate = useNavigate();

  return (
    <div className="error" id="error">
      <h1>Ooops!</h1>
      <p>
        It looks like you've stumbled upon a broken link. Don't worry, it's not
        your fault. It's probably just a glitch in the matrix. Try clicking the button below or head back to the
        homepage. And if the problem persists, don't send us a message and we won't get
        right on it! </p>
        <p>PS: If you're still seeing this page, you may want to check
        if the internet is down or if your device is stuck in a parallel
        universe.</p>
      <button onClick={() => navigate("/")}>Uhm... Take me back</button>
    </div>
  );
}

export default Errorpage;