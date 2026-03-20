import './index.css'

const LatestMatch = ({latestMatchData}) => {
  const {
    umpires,
    result,
    manOfTheMatch,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    matchStatus,
  } = latestMatchData

  return (
    <div className='latest-match-container'>
      <div className='latest-match-left'>
        <p className='latest-match-team'>{competingTeam}</p>
        <p className='latest-match-date'>{date}</p>
        <p className='latest-match-venue'>{venue}</p>
        <p className='latest-match-result'>{result}</p>
      </div>
      <img
        src={competingTeamLogo}
        alt={`latest match ${competingTeam}`}
        className='latest-match-logo'
      />
      <div className='latest-match-right'>
        <p className='latest-match-label'>First Innings</p>
        <p className='latest-match-value'>{firstInnings}</p>
        <p className='latest-match-label'>Second Innings</p>
        <p className='latest-match-value'>{secondInnings}</p>
        <p className='latest-match-label'>Man Of The Match</p>
        <p className='latest-match-value'>{manOfTheMatch}</p>
        <p className='latest-match-label'>Umpires</p>
        <p className='latest-match-value'>{umpires}</p>
        <p className={matchStatus === 'Won' ? 'match-won' : 'match-lost'}>
          {matchStatus}
        </p>
      </div>
    </div>
  )
}

export default LatestMatch
