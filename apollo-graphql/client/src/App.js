import { useState  } from 'react';
import { useQuery } from '@apollo/client';
import './App.css';
import { ALL_PERSONS } from './queries/queries';
import { Persons } from './Persons';
import { PersonForm } from './forms/PersonForm';

function App() {
  const [errorMsg, setErrorMsg] = useState('');
  const result = useQuery(ALL_PERSONS);

  if (result.loading) {
    return (
      <div>
        Loading data...
      </div>
    )
  }

  const setError = msg => {
    setErrorMsg(msg);
    setTimeout(() => {
      setErrorMsg('');
    }, 5000);
  }

  return (
    <div className="App">
      {errorMsg &&
        (
          <div style={{color: 'red', fontWeight: 'bold'}}>
            {errorMsg}
          </div>
        )
      }
      <Persons persons={result.data.allPersons} setErrorMsg={setError}/>
      <PersonForm setErrorMsg={setError}/>
    </div>
  );
}

export default App;
