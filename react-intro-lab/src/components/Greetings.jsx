const Greetings = (props) =>{
    console.log(props);
   let {name} = props;
   
    return <h1>{name}</h1>    
   
   }
   export default Greetings; 