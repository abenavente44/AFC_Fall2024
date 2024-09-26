
const CardContainer = ({ children }) => {
  const containerStyle = {
    border: '2px solid',
    padding: '20px',
  };

  return <div style={containerStyle}>{children}</div>;
};

export default CardContainer;
