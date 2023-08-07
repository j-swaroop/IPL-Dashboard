// Team Card
import "./index.css"
import {Link} from "react-router-dom"


const TeamCard = (props) => {
    const {cardDetails} = props
    const {id, name, teamImageUrl} = cardDetails

    return(
        <Link className="team-card-item-link" to={`/team-matches/${id}`}>
            <li className="card-container"> 
                <img className="team-card-image-url" src={teamImageUrl} alt={name}/>
                <p className="team-card-heading"> {name} </p>
            </li>
        </Link>
    )
}


export default TeamCard