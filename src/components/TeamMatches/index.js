import {Component} from 'react'
import {PieChart, Pie, Cell, Legend, ResponsiveContainer} from 'recharts'
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
      recentMatches: data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      })),
    }
    this.setState({teamMatchesData: updatedData, isLoading: false})
  }

  onClickBack = () => {
    const {history} = this.props
    history.push('/')
  }

  renderTeamMatches = () => {
    const {teamMatchesData} = this.state
    const {teamBannerURL, latestMatch, recentMatches} = teamMatchesData
    const won = recentMatches.filter(m => m.matchStatus === 'Won').length
    const lost = recentMatches.filter(m => m.matchStatus === 'Lost').length
    const drawn = recentMatches.filter(m => m.matchStatus === 'Drawn').length
    const pieChartData = [
      {name: 'Won', value: won},
      {name: 'Lost', value: lost},
      {name: 'Drawn', value: drawn},
    ]
    const COLORS = ['#00c986', '#f34e6a', '#ffd700']
    const legendPayload = pieChartData.map((entry, index) => ({
      value: entry.name,
      color: COLORS[index],
    }))
    return (
      <div className="team-matches-container">
        <button
          className="back-button"
          type="button"
          onClick={this.onClickBack}
        >
          Back
        </button>
        <img src={teamBannerURL} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        <PieChart width={400} height={300}>
          <Pie
            data={pieChartData}
            cx={200}
            cy={150}
            outerRadius={100}
            dataKey="value"
          >
            {pieChartData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend payload={legendPayload} />
        </PieChart>
        <ul className="recent-matches-list">
          {recentMatches.map(each => (
            <MatchCard key={each.id} matchDetails={each} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="team-matches-main-container">
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
