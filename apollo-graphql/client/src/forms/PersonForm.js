import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, ADD_PERSON } from '../queries/queries';

export const PersonForm = props => {
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');

  const [addNewPerson] = useMutation(ADD_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: e => {
      const errors = e.graphQLErrors[0]
      const { message } = errors;
      props.setErrorMsg(message);
    }
  });

  const submit = e => {
    e.preventDefault();
    addNewPerson({
      variables: {
        name, street, city, phone
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
