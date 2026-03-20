import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {teamsList: [], isLoading: true}

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedTeams = data.teams.map(team => ({
      id: team.id,
      name: team.name,
      teamImageUrl: team.team_image_url,
    }))
    this.setState({teamsList: updatedTeams, isLoading: false})
  }

  render() {
    const {teamsList, isLoading} = this.state
    return (
      <div className='home-container'>
        <div className='home-content'>
          <img
            src='https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png'
            alt='ipl logo'
            className='ipl-logo'
          />
          <h1 className='home-heading'>IPL Dashboard</h1>
          {isLoading ? (
            <div data-testid='loader'>
              <Loader type='Oval' color='#ffffff' height={50} />
            </div>
          ) : (
            <ul className='teams-list'>
              {teamsList.map(team => (
                <TeamCard key={team.id} teamData={team} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
