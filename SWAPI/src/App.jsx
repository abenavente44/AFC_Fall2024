import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import { Button, Stack } from "@mui/material";
//people is initialized with empty array
//endpoint setup using axios
//when showTable is true the table component will be rendered and value of people is passed to table as a data prop
const App = () => {
  const [people, setPeople] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const endpoint = "https://swapi.dev/api/people";

  const handleSubmit = () => {
    axios
      .get(endpoint)
      .then((response) => {
        setPeople(response.data.results);
        setShowTable(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleReset = () => {
    setShowTable(false);
    setPeople([]);
  };

  useEffect(() => {}, []);

  return (
    <div className="app">
      <h1>SWAPI</h1>
      <h2>The Star Wars API</h2>
      <Stack direction="row" spacing={1} justifyContent="center">
        <Button
          variant="contained"
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "0.9rem",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            fontSize: "0.9rem",
          }}
          onClick={handleReset}
        >
          Reset
        </Button>
      </Stack>
      {showTable && <Table data={people} />}
    </div>
  );
};

export default App;
