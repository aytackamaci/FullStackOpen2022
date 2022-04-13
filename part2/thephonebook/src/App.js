import { useState } from "react";
import { useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import phonebookServive from "./services/phonebook";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [notificationMessage, setNotificationMessage] = useState([null, 0]);

  useEffect(() => {
    phonebookServive.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addNewName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const index = persons.findIndex((person) => person.name === newName);
    if (index === -1) {
      phonebookServive.create(personObject).then((returnedPerson) => {
        setNotificationMessage([`Added ${returnedPerson.name}`, 1]);
        setTimeout(() => {
          setNotificationMessage([null, 0]);
        }, 5000);
        setPersons(persons.concat(returnedPerson));
        setNewName("");
        setNewNumber("");
      });
    } else if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      const person = persons[index];
      const changedPerson = { ...person, number: newNumber };
      phonebookServive
        .update(changedPerson.id, changedPerson)
        .then((returnedPerson) => {
          setNotificationMessage([
            `Updated phone number of ${changedPerson.name}`,
            2,
          ]);
          setTimeout(() => {
            setNotificationMessage([null, 0]);
          }, 5000);
          setPersons(
            persons.map((person) =>
              person.id !== changedPerson.id ? person : returnedPerson
            )
          );
        })
        .catch((error) => {
          setNotificationMessage([
            `Information of ${changedPerson.name} has already been removed from server`,
            3,
          ]);
          setTimeout(() => {
            setNotificationMessage([null, 0]);
          }, 5000);
          setPersons(persons.filter((n) => n.id !== changedPerson.id));
        });
      setNewName("");
      setNewNumber("");
    } else {
      setNewName("");
      setNewNumber("");
    }
  };

  const deletePerson = (id) => {
    const person = persons.find((n) => n.id === id);
    if (window.confirm(`Delete ${person.name} ?`)) {
      phonebookServive
        .deletePerson(id)
        .then(setPersons(persons.filter((person) => person.id !== id)));
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Filter
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <h3>Add a new</h3>
      <PersonForm
        addNewName={addNewName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      {personsToShow.map((person) => (
        <Persons
          deletePerson={() => deletePerson(person.id)}
          key={person.name}
          name={person.name}
          number={person.number}
        />
      ))}
    </div>
  );
};

export default App;
