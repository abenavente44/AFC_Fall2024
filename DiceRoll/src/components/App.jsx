

//Your random number generator function must ONLY be imported into App component only
//The results of your random number generator will be used to be passed down to Dice as props
//You will have a button
//Your button must have an onClick attribute which triggers a function
//Your triggered function must set the state of your dice
//Your dice results must match the dice icons.
//Use useEffect() to prevent infinite re-rendering.
import React, { useState, useEffect } from 'react'
import { getRandomNumber } from '../helper'
import Dice from './Dice'
import "../App.css"


const App = () => {
  const [dice1, setDice1] = useState(0);
  const [dice2, setDice2] = useState(0);
  const [shouldRoll, setShouldRoll] = useState(false);

  const rollDice = () => {
    setShouldRoll(true);
  };

  useEffect(() => {
    if (shouldRoll) {
      const randomNum1 = getRandomNumber();
      const randomNum2 = getRandomNumber();
      setDice1(randomNum1);
      setDice2(randomNum2);
      setShouldRoll(false);
    }
  }, [shouldRoll]);

  return (
    <div>
      <h1>Roll of the Dice</h1>
      <Dice number1={dice1} number2={dice2} />
      <button className="button" onClick={rollDice}>Click to Roll</button>
    </div>
  );
};

export default App;

