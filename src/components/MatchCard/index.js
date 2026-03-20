import './index.css'

const MatchCard = ({matchDetails}) => {
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails

  return (
    <li className='match-card'>
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className='match-card-logo'
      />
      <p className='match-card-team'>{competingTeam}</p>
      <p className='match-card-result'>{result}</p>
      <p
        className={matchStatus === 'Won' ? 'match-card-won' : 'match-card-lost'}
      >
        {matchStatus}
      </p>
    </li>
  )
}

export default MatchCard
