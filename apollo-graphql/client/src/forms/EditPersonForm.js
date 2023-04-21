import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_PHONE } from '../queries/queries';

export const EditPersonForm = props => {
  const { person } = props;
  const [name, setName] = useState(person.name);
  const [street, setStreet] = useState(person.street);
  const [city, setCity] = useState(person.city);
  const [phone, setPhone] = useState(person.phone);
  const [updatePhone, result] = useMutation(UPDATE_PHONE, {
    onError: e => {
      const errors = e.graphQLErrors[0]
      const { message } = errors;
      props.setError(message);
    }
  });

  useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      props.setError('person not found')
    }
  }, [result.data])

  const submit = e => {
    e.preventDefault();
    updatePhone({
      variables: { name, phone }
    });
  }
  return (
    <form onSubmit={submit}>
      <div style={{marginBottom: '0.5rem'}}>Name: <input name='name' value={name} onChange={e=>setName(e.target.value)}/></div>
      <div style={{marginBottom: '0.5rem'}}>Street: <input name='name' value={street} onChange={e=>setStreet(e.target.value)}/></div>
      <div style={{marginBottom: '0.5rem'}}>City: <input name='name' value={city} onChange={e=>setCity(e.target.value)}/></div>
      <div style={{marginBottom: '0.5rem'}}>Phone: <input name='phone' value={phone} onChange={e=>setPhone(e.target.value)}/></div>
      <button type='submit'> update </button>
    </form>
  );
}