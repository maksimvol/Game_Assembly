
import JackpotChosenComponent from '../../components/Jackpots/JackpotChosenComponent';

const ChosenJackpot = ( {user}: any) => {
    
    return (
      <div>
            <h1>Chosen Jackpot Info</h1>
            <div style={{ display: 'inline-block' }}>
                <JackpotChosenComponent user={user} />
            </div>
        </div>
    );
  };
  
  export default ChosenJackpot;