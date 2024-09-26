const Greetings = (props) =>{
    console.log(props);
    let {name} = props;

    return (
    <div>
    <h1>{name}</h1>    
   </div>
 );
};
   export default Greetings; 