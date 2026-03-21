import {Component} from 'react'
import {PieChart, Pie, Cell, Legend} from 'recharts'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {teamMatchesData: {}, isLoading: true}

  componentDidMount() {
    this.getTeamMatches()
  }

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerURL: data.team_banner_url,
      latestMatch: {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      },
      recentMatches: data.recent_matches.map(eachMatch => ({
        umpires: eachMatch.umpires,
        result: eachMatch.result,
        manOfTheMatch: eachMatch.man_of_the_match,
        id: eachMatch.id,
        date: eachMatch.date,
        venue: eachMatch.venue,
        competingTeam: eachMatch.competing_team,
        competingTeamLogo: eachMatch.competing_team_logo,
        firstInnings: eachMatch.first_innings,
        secondInnings: eachMatch.second_innings,
        matchStatus: eachMatch.match_status,
      })),
    }

    this.setState({teamMatchesData: updatedData, isLoading: false})
  }

  renderPieChart = () => {
    const {teamMatchesData} = this.state
    const {recentMatches} = teamMatchesData

    const won = recentMatches.filter(m => m.matchStatus === 'Won').length
    const lost = recentMatches.filter(m => m.matchStatus === 'Lost').length
    const drawn = recentMatches.filter(m => m.matchStatus === 'Drawn').length

    const pieData = [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]

    return (
      <PieChart width={400} height={300}>
        <Pie cx={200} cy={150} data={pieData} dataKey='value' outerRadius={100}>
          <Cell name='Won' fill='#a844c9' />
          <Cell name='Lost' fill='#f7db71' />
          <Cell name='Drawn' fill='#00c8c8' />
        </Pie>
        <Legend />
      </PieChart>
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderTeamMatchesView = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch, recentMatches} = teamMatchesData

    return (
      <>
        <img src={teamBannerURL} alt='team banner' className='team-banner' />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderPieChart()}
        <ul className='recent-matches-list'>
          {recentMatches.map(eachMatch => (
            <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className='team-matches-container'>
        <button
          type='button'
          className='back-button'
          onClick={this.onClickBack}
        >
          Back
        </button>
        {isLoading ? (
          <div data-testid='loader'>
            <Loader type='Oval' color='#ffffff' height={50} width={50} />
          </div>
        ) : (
          this.renderTeamMatchesView()
        )}
      </div>
    )
  }
}

export default TeamMatches
