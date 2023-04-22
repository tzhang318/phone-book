import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, ADD_PERSON } from '../queries/queries';
import { updateCache } from '../utils/updateCache';

export const PersonForm = props => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const [addNewPerson] = useMutation(ADD_PERSON, {
    onError: e => {
      const errors = e.graphQLErrors[0]
      const { message } = errors;
      props.setError(message);
    },
    update: (cache, response) => {
      updateCache(cache, { query: ALL_PERSONS }, response.data.addPerson)
    }
  });

  const submit = e => {
    e.preventDefault();
    addNewPerson({
      variables: {
        name, street, city,
        phone: phone.length > 0 ? phone : undefined
      }
    });
    setName('');
    setStreet('');
    setCity('');
    setPhone('');
  };

  return (
    <form onSubmit={submit}>
      <div style={{marginBottom: '0.5rem'}}>Name: <input name='name' value={name} onChange={e=>setName(e.target.value)}/></div>
      <div style={{marginBottom: '0.5rem'}}>Street: <input name='name' value={street} onChange={e=>setStreet(e.target.value)}/></div>
      <div style={{marginBottom: '0.5rem'}}>City: <input name='name' value={city} onChange={e=>setCity(e.target.value)}/></div>
      <div style={{marginBottom: '0.5rem'}}>Phone: <input name='phone' value={phone} onChange={e=>setPhone(e.target.value)}/></div>
      <button type='submit'> add </button>
    </form>
  );
};
