
import MathChosenComponent from '../../components/Maths/MathChosenComponent';

const ChosenMath = ( {user}: any) => {
    
    return (
      <div>
            <h1>Chosen Math Info</h1>
            <div style={{ display: 'inline-block' }}>
                <MathChosenComponent user={user} />
            </div>
        </div>
    );
  };
  
  export default ChosenMath;