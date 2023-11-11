// TeamMatches
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    recentMatches: [],
    latestMatches: {},
    isLoading: true,
  }

  componentDidMount() {
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
      venue: eachItem.venue,
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
      venue: latestMatchesDetails.venue,
    }

    this.setState({
      teamBannerUrl: updatedTeamBannerUrl,
      recentMatches: updatedRecentMatches,
      latestMatches: updatedLatestMatchDetails,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderTeamMatchDetails = () => {
    const {teamBannerUrl, latestMatches, recentMatches} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className="team-match-details-content-container">
        <img className="banner-image" src={teamBannerUrl} alt="team banner" />
        <p className="latest-matches-heading"> Latest Matches </p>
        <LatestMatch key={latestMatches.id} details={latestMatches} />
        <ul className="recent-matches-container">
          {recentMatches.map(eachItem => (
            <MatchCard key={eachItem.id} matchCardDetails={eachItem} />
          ))}
        </ul>
        {this.renderPieChart()}
        <Link to="/" className="back-link">
          <button type="button" className={`back-btn ${id}`}>
            {' '}
            Back{' '}
          </button>
        </Link>
      </div>
    )
  }

  renderPieChart = () => {
    const {recentMatches} = this.state

    let won = 0
    let lost = 0
    let draw = 0

    const m = recentMatches.map(item => {
      if (item.matchStatus === 'Won') {
        won += 1
      } else if (item.matchStatus === 'Lost') {
        lost += 1
      } else if (item.matchStatus === 'Draw') {
        draw += 1
      }
      return item
    })

    const chartData = [
      {status: 'Won', count: won},
      {status: 'Lost', count: lost},
      {status: 'Draw', count: draw},
    ]
    return (
      <div className="piechart">
        <ResponsiveContainer width="90%" height={300}>
          <PieChart>
            <Pie
              cx="50%"
              cy="50%"
              data={chartData}
              startAngle={0}
              endAngle={360}
              innerRadius="36%"
              outerRadius="70%"
              dataKey="count"
              label
            >
              <Cell name="Won" fill="green" />
              <Cell name="Lost" fill="red" />
              <Cell name="Draw" fill="grey" />
            </Pie>
            <Legend
              iconType="diamond"
              layout="vertical"
              verticalAlign="middle"
              align="right"
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    const {match} = this.props
    const {params} = match
    const {id} = params

    return (
      <div className={`team-matches-bg-container ${id}`}>
        {isLoading ? this.renderLoader() : this.renderTeamMatchDetails()}
      </div>
    )
  }
}

export default TeamMatches
