import { useReducer } from "react";

const initialSate = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "inc":
      return { ...state, count: state.count + action.payload };
    case "dec":
      return { ...state, count: state.count - action.payload };
    case "setCount":
      return { ...state, count: action.payload };
    case "setStep":
      return { ...state, step: action.payload };
    case "reset":
      return initialSate;
    default:
      throw new Error();
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialSate);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2023");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec", payload: step });
  };

  const inc = function () {
    dispatch({ type: "inc", payload: step });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    dispatch({ type: "setStep", payload: Number(e.target.value) });
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;

// useReducer is the more advanced hook for managing state.
// It is worth learning, but useState is more common.
// with useReducer function we can do all the state update logic at one place
// and we can pass the state and dispatch function to the child components
// when to use useReducer
// 1. when the state logic is complex
// 2. when the state depends on the previous state
// 3. when the state is an object or array
// 4. when the state is updated frequently
// 5. when the state is updated asynchronously

//when components have a lot of state variables and state updates, spread across
// many event handlers all over the component

// when multiple state variables that are updated together

// when updating one piece of state also requires updating another piece of state

// const [state, dispatch] = useReducer(reducer, initialSate);

// useReducer needs reducer function containing all logic
// to update state. Decouples state logic from component

// reducer is a pure function that takes current state and actio and returns the next state

// action object that describles how to update state

// dispatch function to trigger the update by sending actions from event handlers to the reducer
