import { useState } from 'react';
import PlayIcon from '../assets/play.svg';
import '../styles/Home.css';
import Preparation from './Preparation.jsx'


function Home() {
    const [value, setValue] = useState(5);
    const [showPreparation, setShowPreparation] = useState(false);

    if (showPreparation) {
        return <Preparation numberCards={value}/>;
    }
    return(
        <div className="play-screen">
            <div className="slider-container">
                <label htmlFor="card-range">Number of Cards: {value}</label>
                <input
                    id="card-range"
                    type="range"
                    min="1"
                    max="26"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            </div>
            <button className="play-button" onClick={() => setShowPreparation(true)}>
                <img src={PlayIcon} width={50} height={50} /> 
                Play
            </button>
        </div>
    )
}

export default Home;