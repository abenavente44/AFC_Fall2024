import { useState } from "react";
//import './App.css'

function App() {

const initPerson = {
fname: "",
lname:"",
age: 21

  }
  const [personData, setPersonData] = useState({});

  //add a new property
  const handleChange = (event) => {
    setPersonData({ ...personData, [event.target.name]: event.target.value });
    //setPersonData ({fname:event.target.value});
    //console.log(personData);
  };

  const handleSubmit = () => {
    event.preventDefault();
    console.log("Sending data:", personData);
    setPersonData(initPerson)
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">
          First Name:
          <input
            type="text"
            id="fname"
            name="fname"
            value={personData.fname}
            onChange={handleChange}
            required 
            minLength={3}
            maxLength={5}
            autoComplete="off"
          />
        </label>
        <br />
        <label htmlFor="lname">
          Last Name:
          <input
            type="text"
            id="lname"
            name="lname"
            value={personData.lname}
            onChange={handleChange}
            maxLength={5}
          />
        </label>
        <br />
        <label htmlFor="age">
          Age:
          <input
            type="number"
            id="age"
            name="age"
            value={personData.age}
            onChange={handleChange}
            min={21}
            max={99}
          />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
