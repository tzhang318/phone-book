import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Person } from './Person';
import { EditPersonForm } from './forms/EditPersonForm';
import { FIND_PERSON_BY_NAME } from './queries/queries';

export const Persons = props => {
  const [name, setName] = useState(null);
  const [show, setShow] = useState(false);
  const result = useQuery(FIND_PERSON_BY_NAME, {
    variables: { name },
    skip: !name
  });

  if (name && result.data) {
    return (
      <Person
        person={result.data.findPerson}
        onClick={setName}
      />
    );
  }

  const toggleShow = () => setShow(!show);

  return (
    <div>
      {props.persons.map(p => (
        <div style={{marginBottom: '0.5rem'}} key={p.id}>
          {p.name}
          <button onClick={()=>setName(p.name)}>show details</button>
          <button onClick={()=>setShow(!show)}>edit</button>
          {show && <EditPersonForm person={p} setError={props.setErrorMsg}/>}
        </div>
      ))}
      <button onClick={toggleShow}>addPerson</button>
    </div>
  )
}
