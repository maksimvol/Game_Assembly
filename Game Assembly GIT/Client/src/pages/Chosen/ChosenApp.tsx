
import AppChosenComponent from '../../components/Apps/AppChosenComponent';

const ChosenApp = ( {user}: any) => {
    
    return (
      <div>
            <h1>Chosen App Info</h1>
            <div style={{ display: 'inline-block' }}>
                <AppChosenComponent user={user} />
            </div>
        </div>
    );
  };
  
  export default ChosenApp;