import GameComponent from '../components/Games/GameComponents';
import JackpotComponent from '../components/Jackpots/JackpotComponents';
import MathComponent from '../components/Maths/MathComponents';

const RecordsPage = () => {
    return (
      <div className='main'>
            <h1>Games and Game Sets</h1>
            <div style={{ display: 'inline-block' }}>
                <GameComponent />
            </div>
            <h1>Math Info</h1>
            <div style={{ display: 'inline-block' }}>
                <MathComponent />
            </div>
            <h1>Jackpot Info</h1>
            <div style={{ display: 'inline-block' }}>
                <JackpotComponent />
            </div>
        </div>
    );
  };
  
  export default RecordsPage;