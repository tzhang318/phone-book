import { useState } from "react";

export const PersonForm = props => {
  const [newName, setNewName] = useState('');
  const [phoneNumber, setPhoneNumber ] = useState('');

  const submit = e => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: phoneNumber
    };

    const person = props.persons.find(person => person.name.toLowerCase() === newName.toLowerCase());
    if (person) {
      const isOK = window.confirm(`${newName} is already added to the phone book. Do you want to update the phone number?`);
      if (isOK) {
        props.handleUpdate({
          ...person,
          ...newPerson          
        });
      }
    } else {
      props.handleAdd(newPerson);
      setNewName('');
      setPhoneNumber('');
    }
  };

  return (
    <form onSubmit={submit}>
      <div>
        name: <input onChange={e => setNewName(e.target.value)} value={newName}/>
      </div>
      <div>
        number: <input onChange={e=>setPhoneNumber(e.target.value)} value={phoneNumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

      