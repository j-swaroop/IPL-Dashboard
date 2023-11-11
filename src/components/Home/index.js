// Home
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    iplTeamsArray: [],
  }

  componentDidMount() {
    this.getTeamCards()
  }

  getTeamCards = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const updatedData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({iplTeamsArray: updatedData, isLoading: false})
  }

  renderContent = () => {
    const {iplTeamsArray} = this.state

    return (
      <div className="content-container">
        <div className="heading-logo-container">
          <img
            className="logo"
            alt="ipl logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
          />
          <h1 className="heading"> IPL Dashboard </h1>
        </div>
        <ul className="ipl-cards-container">
          {iplTeamsArray.map(eachItem => (
            <TeamCard key={eachItem.id} cardDetails={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div className="bg-container">
        {isLoading ? this.renderLoader() : this.renderContent()}
      </div>
    )
  }
}

export default Home
