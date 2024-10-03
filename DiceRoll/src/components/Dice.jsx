//Your array must ONLY be imported in Dice component
//The random number generated from props will be used to choose element in Dice

import React from 'react'
import { diceValues } from '../helper'

const Dice = ({ number1, number2 }) => {
 
 const diceIcons = diceValues.map((value, index) => `fas fa-dice-${value}`);

const total = (number1 + 1) + (number2 + 1);

    return (
      <div>
        <div>
          <i className={`dice-icon ${diceIcons[number1]}`}></i>
          <i className={`dice-icon ${diceIcons[number2]}`}></i>
        </div>
        <h2>Roll equals {total}</h2>
      </div>
    );
  };
  
  export default Dice;
