import { Link } from "react-router-dom"
import './style.css';
function ClassBox (props : any) {
  return (
    <div className="class-box">
     
        <div className='btn-class-box'> 
            <Link className='a' to={`/teacher/${props.id}`}>{props.id}</Link>
        </div>
    </div>
    
  )
}

export default ClassBox





