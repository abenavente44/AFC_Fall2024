
import CardContainer from './components/CardContainer';
import Greetings from './Components/Greetings';
import UserCard from './Components/UserCard';

const App = () => {
  const name = "Alex"; 
  const users = [
    { name: "Bob", age: 30 },
    { name: "Charlie", age: 35 },
    { name: "Alice", age: 25 },
  ];
    // Helper function to sort users by age
    const sortByAge = (a, b) => a.age - b.age;
     // Sort the array
  const sortedUsers = [...users].sort(sortByAge);
  return (
    <CardContainer>
      <h1>Hello, {name}</h1>
      {sortedUsers.map((user, index) => (
        <UserCard key={index} name={user.name} age={user.age} />
      ))}
    </CardContainer>
  );
};

export default App;
