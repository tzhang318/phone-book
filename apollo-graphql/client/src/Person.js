export const Person = props => {
  const { person } = props;

  return (
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>{person.name}</div>
      <div style={{ marginBottom: '0.5rem' }}> {`${person.address.street}, ${person.address.city}`} </div>
      <div style={{ marginBottom: '0.5rem' }}> {person.phone} </div>
      <button onClick={()=>props.onClick(null)}>close</button>
    </div>
  )
};
