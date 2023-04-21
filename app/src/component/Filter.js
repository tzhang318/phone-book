export const Filter = props => {
  return (
    <div>
      filter shown with:
      <input value={props.filterStr} onChange={e=>props.setFilter(e.target.value)} />
    </div>
  );
}