import { useEffect, useState, useRef } from 'react';
import '../styles/Preparation.css';
import { shuffle } from 'lodash';
import GameResult from './GameResult.jsx';

function Preparation({numberCards}) {
  const [images, setImages] = useState([]);
  const urlsRef = useRef([]);
  const numberOfCards = numberCards;

  const [score, setScore] = useState(new Set());
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(JSON.parse(localStorage.getItem('highScore')) || 0);

  const handleClick =(key) => {
    if (score.has(key)) {
      if (score.size > highScore) {
        setHighScore(score.size);
        localStorage.setItem('highScore', JSON.stringify(score.size));
      }
      setGameOver(true);
    } else {
      setScore(prevScore => {
        const newScore = new Set(prevScore);
        newScore.add(key);
        if (newScore.size > highScore) {
          setHighScore(newScore.size);
          localStorage.setItem('highScore', JSON.stringify(newScore.size));
        }
        return newScore;
      });
    }
  }

  useEffect(() => {
    const fetchImages = async () => {
      const imagePromises = [];
      for(let i=0; i<numberOfCards;i++){
        const char = String.fromCharCode('A'.charCodeAt(0) + i);
        const promise = fetch('https://robohash.org/' + char)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          urlsRef.current.push(url);
          return {char, url};
        })
        .catch(error => {
          console.error('Error fetching image:', error);
          return null;
        });
        imagePromises.push(promise);
      }
      
      const results = await Promise.all(imagePromises);
      const validImages = results.filter(img => img !== null);
      setImages(validImages);
    };
    
    fetchImages();
    
    return () => {
      urlsRef.current.forEach(url => URL.revokeObjectURL(url));
      urlsRef.current = [];
    };
    
  }, []);

  if (score.size == numberOfCards || gameOver) {
    return <GameResult target={numberOfCards} score={score.size} highscore={highScore} gameResult={gameOver}/>;
  }

  return (
    <div>
      <div className='scoreboard'>
        <span className='score score-text'>Current Score: {score.size}</span>
        <span className='score score-text'>Target: {numberOfCards}</span>
        <span className='score score-text'>Highest Score: {highScore}</span>
      </div>
      <div className="card-container">
        {shuffle(images).map(({ char, url }) => (
          <div key={char} className="robot-card" onClick={() => handleClick(char)}>
            <img key={char} src={url} alt={`Robot ${char}`} />
            <span className='card-text'>{char}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Preparation;