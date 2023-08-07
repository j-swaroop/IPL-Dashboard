// Write your code here
import "./index.css"

const MatchCard = (props) => {
    const {matchCardDetails} = props
    const {
            id, 
            competingTeam, 
            competingTeamLogo, 
            date, 
            firstInnings, 
            manOfTheMatch, 
            matchStatus, 
            result, 
            umpires, 
            secondInnings, 
            venue } = matchCardDetails

    const isWonOrLostClassName = matchStatus === "Won"? "won-text-color": "lost-text-color"


    return(
        <li className="match-card-bg-container"> 
            <img className="match-card-img" src={competingTeamLogo} alt={`competing team ${competingTeam}`} />
            <p className="match-card-competeting-team"> {competingTeam} </p>
            <p className="match-card-result"> {result} </p>
            <p className={`match-card-match-status ${isWonOrLostClassName} `}> {matchStatus} </p>
        </li>
    )
}

export default MatchCard