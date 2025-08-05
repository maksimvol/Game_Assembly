
import GameChosenComponent from '../../components/Games/GameChosenComponent';

const ChosenGame = ( {user}: any) => {
    
    return (
      <div>
            <h1>Chosen Game Info</h1>
            <div style={{ display: 'inline-block' }}>
                <GameChosenComponent user={user} />
            </div>
        </div>
    );
  };
  
  export default ChosenGame;