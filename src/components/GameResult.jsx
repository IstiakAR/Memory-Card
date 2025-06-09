import '../styles/GameResult.css';

function GameResult({score, highscore, target, gameResult}){
    return(
        <div className='game-result'>
            {
                gameResult ? 
                <h1>Game Over</h1> :
                <h1>You Win</h1>
            }
            <p>Your Score: {score}</p>
            <p>High Score: {highscore}</p>
            <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
    )
}

export default GameResult;