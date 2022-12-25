const incre = (name, quantity = 1) => (standing) =>{
    return {...standing, [name]:standing[name] + quantity }
}

const updateStanding = ( {league, standingWin, standingLoss, goalWin, goalLose, isEqual=false}) => {
    const {winScore, loseScore, equalScore} = league
    standingWin = incre("matchesPlayed")(standingWin)
    standingWin = incre("goalsAgainst",goalWin)(standingWin)
    standingWin = incre("goalsFor",goalLose)(standingWin)
    if(!isEqual) {
        standingWin = incre("won")(standingWin)
        standingWin = incre("points",winScore)(standingWin)
    } else {
        standingWin = incre("draw")(standingWin)
        standingWin = incre("points",equalScore)(standingWin)
    }

    standingLoss = incre("matchesPlayed")(standingLoss)
    standingLoss = incre("goalsAgainst",goalLose)(standingLoss)
    standingLoss = incre("goalsFor",goalWin)(standingLoss)
    if(!isEqual) {
        standingLoss = incre("loss")(standingLoss)
        standingLoss = incre("points",loseScore)(standingLoss)
    } else {
        standingLoss = incre("draw")(standingLoss)
        standingLoss = incre("points",equalScore)(standingLoss)
    }
    return [standingWin,standingLoss]
}

const leagueHelper = {
    incre,
    updateStanding
}


export default leagueHelper