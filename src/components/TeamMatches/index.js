// TeamMatches
import {Component} from "react"
import Loader from "react-loader-spinner"
import LatestMatch from "../LatestMatch"
import MatchCard from "../MatchCard"
import "./index.css"

class TeamMatches extends Component{
    state = {
        teamBannerUrl: "",
        recentMatches: [],
        latestMatches: {},
        isLoading: true
    }

    componentDidMount(){
        this.getTeamMatchDetails()
    }

    getTeamMatchDetails = async () => {
        const {match} = this.props
        const {params} = match
        const {id} = params
        
        const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
        const data = await response.json()
      
        const updatedTeamBannerUrl = data.team_banner_url

        const updatedRecentMatches = data.recent_matches.map(eachItem => ({
            id: eachItem.id,
            competingTeam: eachItem.competing_team,
            competingTeamLogo: eachItem.competing_team_logo,
            date: eachItem.date,
            firstInnings: eachItem.first_innings,
            manOfTheMatch: eachItem.man_of_the_match,
            matchStatus: eachItem.match_status,
            result: eachItem.result,
            umpires: eachItem.umpires,
            secondInnings: eachItem.second_innings,
            venue: eachItem.venue
        }))
        
        const latestMatchesDetails = data.latest_match_details

        const updatedLatestMatchDetails = {
            id: latestMatchesDetails.id,
            competingTeam: latestMatchesDetails.competing_team,
            competingTeamLogo: latestMatchesDetails.competing_team_logo,
            date: latestMatchesDetails.date,
            firstInnings: latestMatchesDetails.first_innings,
            manOfTheMatch: latestMatchesDetails.man_of_the_match,
            matchStatus: latestMatchesDetails.match_status,
            result: latestMatchesDetails.result,
            umpires: latestMatchesDetails.umpires,
            secondInnings: latestMatchesDetails.second_innings,
            venue: latestMatchesDetails.venue
        }


        this.setState({
            teamBannerUrl: updatedTeamBannerUrl,
            recentMatches: updatedRecentMatches,
            latestMatches: updatedLatestMatchDetails,
            isLoading: false
        })
    }

    renderLoader = () => {
        return(
            <div className="loader" testid="loader"> 
                <Loader type="Oval" color="#ffffff" height={50} width={50} /> 
            </div>
        )
    }

    renderTeamMatchDetails = () => {
        const {teamBannerUrl, latestMatches, recentMatches, isLoading} = this.state

        return(
            <div className="team-match-details-content-container">
                <img className="banner-image" src={teamBannerUrl} alt="team banner"/>
                <p className="latest-matches-heading"> Latest Matches </p>
                <LatestMatch key={latestMatches.id} details={latestMatches} />
                <ul className="recent-matches-container"> 
                    {recentMatches.map(eachItem => <MatchCard key={eachItem.id} matchCardDetails={eachItem}/>)}
                </ul>
            </div>
        )
    }

    render(){
        const {teamBannerUrl, latestMatches, recentMatches, isLoading} = this.state
        
        const {match} = this.props
        const {params} = match
        const {id} = params
        
        
        return(
            <div className={`team-matches-bg-container ${id}`}>
                {isLoading? (this.renderLoader()): (this.renderTeamMatchDetails())}
            </div>
        )
    }
}

export default TeamMatches