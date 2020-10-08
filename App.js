import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const calculateTimeLeft = () => {

          // find the current year put it to variable year
    let year = new Date().getFullYear();

          // calculates the time remaining between the current date and the first day of target date
          //this year with specific date - today date
          // The + before the new Date object is shorthand to tell JavaScript to cast the object as an integer, which gives you the object’s Unix timestamp represented as microseconds since the epoch.
    const difference = +new Date(`${year}-11-9`) - +new Date();
    
          // In this step, you will create an empty object called timeLeft, use an if statement to check if there is time remaining, and calculate the total number of hours, minutes, and seconds by using math and the modulus (%) operator. Finally, you will return the timeLeft.
          // First, create the empty object called timeLeft which will then be filled in with days, hours, minutes, and seconds in the if statement.
          let timeLeft = {};

          // In this code, you round the numbers from the day, hours, minutes, and seconds down and drop the remainder to get a whole number value. You can then compare the difference to see if it is greater than 0.
          // Finally, you need to return timeLeft so that you can use the value elsewhere in the component.
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());
            // The useEffect is what updates the amount of time remaining. By default, React will re-invoke the effect after every render.
            // Every time the variable timeLeft is updated in the state, the useEffect fires. Every time that fires, we set a timer for 1 second (or 1,000ms), which will update the time left after that time has elapsed            
            // The cycle will continue every second after that            
            // To help to eliminate the potential of stacking timeouts and causing an error you should add the clearTimeout method inside the useEffect hook as well.           
            // Add a clearTimeout method and pass in the variable timer as a parameter:
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });
              //   In this step, you will use Object.keys to iterate over the timeLeft object and build out a display component. You will use the display component to show the time left before sale begins.
              // First, create a new variable under the useEffect hook called timerComponents
              //After iterating over the keys in timeLeft, you will use this variable to push a new JSX component with the time left.
              // Next, use Object.keys to iterate over the timeLeft object you returned from your calculateTimeLeft function.
              // Here the code loops through the properties of the timeLeft object. If the timer interval has a value above zero, it adds an element to the timerComponents array.
              // Note: The extra {" "} in the code is used so that the intervals that display the time left do not run into each other when displayed on the screen.
              // The {} allow you to use JavaScript inside your JSX and the "" add the space.
  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });
  return (
    <div>
      <h1>Special <small>Year of</small> {year}</h1>
      <h1>Time Left For Sale </h1>
        <div>
          <span className='date'>
          {timerComponents.length ? timerComponents : <span>Time's up! Wait for Next Sale!</span>}
          </span>
        </div>
      </div>
  );
}

export default App;