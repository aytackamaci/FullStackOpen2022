const Persons = ({ deletePerson, name, number }) => {
  return (
    <div>
      {name} {number}
      <button onClick={deletePerson}>delete</button>
    </div>
  );
};

export default Persons;
