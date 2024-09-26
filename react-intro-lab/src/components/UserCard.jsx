
const UserCard = ({ name, age }) => {
  const cardStyle = {
    border: '3px solid',
    padding: '10px',
    marginBottom: '10px'
  };

  return (
    <div style={cardStyle}>
      <h2>{name}</h2>
      <p>Age:{age}</p>
    </div>
  );
};

export default UserCard;
