import React, { useState, useEffect } from 'react';
import { Filter } from './component/Filter';
import { PersonForm } from './component/PersonForm';
import { Persons } from './component/Persons';
import { getPersons, addPerson, updatePerson, deletePerson } from './api/personsApi';

import './App.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filerStr, setFilter] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getPersons().then(data=>{
      setPersons(data);
    });
  }, []);

  useEffect(() => {
    if (successMsg) {
      getPersons().then(data=>{
        setPersons(data);
      });
    }
  }, [successMsg]);

  const setMessage = (message) => {
    if (!message.includes('error')) {
      setSuccessMsg(message);
      setTimeout(() => setSuccessMsg(''), 5000);
    } else {
      setErrorMsg(`error: ${message}`);
      setTimeout(() => setErrorMsg(''), 5000);
    }
  };

  const onUpdate = person => {
    updatePerson(person)
      .then(updated => {
        setMessage(`Updated ${updated.name}`);
      })
      .catch(e => {
        setMessage(`error: ${e.response.data.error}`);
      });
  };

  const onAdd = person => {
    addPerson(person)
      .then(added => {
        setMessage(`Added ${person.name}`);
      })
      .catch(e => {
        setMessage(`error: ${e.response.data.error}`);
      });
  };

  const onDelete = id => {
    deletePerson(id)
      .then(deleted => {
        setMessage(`${deleted.name} is deleted.`);
      })
      .catch(e => {
        setMessage(`error: person of ${id} does not exist in phone book.`);
      });
  };

  return (
    <div className='phone-book'>
      <h2>Phonebook</h2>
      {successMsg &&
        <div className='success'> {successMsg} </div>
      }
      {errorMsg &&
        <div className='error'> {errorMsg} </div>
      }
      <Filter filerStr={filerStr} setFilter={setFilter} />
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        handleAdd={onAdd}
        handleUpdate={onUpdate}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filterStr={filerStr}
        handleDelete={onDelete}
      />
    </div>
  );
};

export default App;
