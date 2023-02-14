import './splitpage.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments, faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons";

type SplitpageProps = {
    left: boolean
}

function Splitpage(props: SplitpageProps) {

  return (
      <div className={ props.left ? 'splitpage split-left' : 'splitpage split-right'}>
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
  )
}

export default Splitpage
