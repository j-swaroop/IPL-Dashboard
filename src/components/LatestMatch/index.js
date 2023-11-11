// Write your code here
import './index.css'

const LatestMatch = props => {
  const {details} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    firstInnings,
    manOfTheMatch,
    result,
    umpires,
    secondInnings,
    venue,
  } = details

  return (
    <div className="latest-match-bg-container">
      <div className="latest-match-container">
        <div>
          <p className="latest-match-team"> {competingTeam} </p>
          <p className="latest-match-date"> {date} </p>
          <p className="latest-match-venue"> {venue} </p>
          <p className="latest-match-result"> {result} </p>
        </div>
        <div className="latest-match-image">
          <img
            className="competeting-team-img"
            alt={`latest match ${competingTeam}`}
            src={competingTeamLogo}
          />
        </div>
      </div>
      <div>
        <p className="latest-match-first-innings-text"> First Innings </p>
        <p className="latest-match-first-innings"> {firstInnings} </p>
        <p className="latest-match-first-innings-text"> Second Innings</p>
        <p className="latest-match-first-innings"> {secondInnings} </p>
        <p className="latest-match-man-of-the-match-text"> Man Of The Match </p>
        <p className="latest-match-man-of-the-match"> {manOfTheMatch} </p>
        <p className="latest-match-umpires-text"> Umpires </p>
        <p className="latest-match-umpires"> {umpires} </p>
      </div>
    </div>
  )
}

export default LatestMatch
