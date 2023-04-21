export const Notify = props => {
  if (!props.errorMessage) {
    return null;
  }
  
  return (
    <div style={{color: 'red', fontWeight: 'bold'}}>{props.errorMessage}</div>
  )
}