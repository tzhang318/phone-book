import React from "react";

export const Persons = ({ persons = [], filterStr, handleDelete }) =>{
  const onDelete = person => {
    const okToDelete = window.confirm(`Delete ${person.name}?`);
    if (okToDelete) {
      handleDelete(person.id);
    }
  }
return (
    <div>
      {persons.filter(p=>p.name.toLowerCase().includes(filterStr.toLowerCase()))
          .map(person => (
            <div key={person.name}>
              {`${person.name} ${person.number}`}
              <button onClick={() => onDelete(person)}>Delete</button>
            </div>
          ))
        }
    </div>
  );
};
