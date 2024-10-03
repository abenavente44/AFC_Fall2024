import React from 'react';
import '../src/index.css';
//the prop data from people is being passed no need to import
const Table = ({ data }) => {
  return (
    <table className="character-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Hair Color</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        {data.map(person => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.height}</td>
            <td>{person.hair_color}</td>
            <td>{person.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
