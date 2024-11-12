const PetDetail = (props) => {
  if (!props.selected) {
    return (<h2>There are no pet details.</h2>)
  }

  return (
    <>
      <h2>Name: { props.selected.name }</h2>
      <h4>Age: { props.selected.age}</h4>
      <h4>Breed: { props.selected.breed }</h4>
      <p>`${props.selected.name} is a ${props.selected.age} year old ${props.selected.breed}`</p>

      <button onClick={() => props.handleFormView(props.selected)}>Edit</button>

    </>
  )
}

export default PetDetail;