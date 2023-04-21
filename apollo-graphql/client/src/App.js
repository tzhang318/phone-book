import { useState  } from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import './App.css';
import { ALL_PERSONS } from './queries/queries';
import { Persons } from './Persons';
import { PersonForm } from './forms/PersonForm';
import { PhoneForm } from './forms/PhoneForm';
import { Notify  } from './components/Notify';
import { LoginForm } from './forms/LoginForm';

function App() {
  const [token, setToken] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const result = useQuery(ALL_PERSONS);
  const client = useApolloClient();
  
  const notify = (message) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg(null)
    }, 5000);
  };

  if (!token) {
    return (
      <div>
        <Notify errorMessage={errorMsg} />
        <LoginForm
          setToken={setToken}
          setError={notify}
        />
      </div>
    );
  }

  if (result.loading) {
    return (
      <div>
        Loading data...
      </div>
    );
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div className="App">   
      <Notify errorMessage={errorMsg} />
      <button onClick={logout}>logout</button>
      <Persons persons={result.data.allPersons} setErrorMsg={notify}/>
      <PersonForm setError={notify}/>
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App;
