import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);
  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 3) {
      setStep((s) => s + 1);
      setStep((s) => s + 1);
    }
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">
            Step {step}: {messages[step - 1]}
          </p>
          <div className="buttons">
            <button
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
              onClick={handlePrevious}
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// Updating state based on current state

// always define a callback function otherwise react will call it immediately
// <button onClick={() => alert("Prev")}>Prev</button>
// <button onClick={alert("Prev")}>Prev</button>
// hooks can only be called inside a function component
// hooks can only be called at the top level of a function component
// hooks can only be called from react function components
// hooks can not be called from regular javascript functions
// hooks can not be called from class based components
// don't set state inside a loop
// don't set state manually
// always update state by using setState
// React is declarative
// we don't do direct DOM mutations
// how is a component view updated then?
// In React, a view is updated by re-rendering the entire component
// React will re-render the entire component when the state or props change
// React reacts to state changes by re-rendering the entire component
// component should always be wrapped in div or fragment. we can't use javascript directly inside jsx
// react rembemer the last state of the component
// we should not update state based on current state
// alaways use callback function to update state based on current state

// more thoushts about state + state guidelines
// Each component has and manage its own state, no many times we render the same component
//if one component is getting repeated multiple times then each component will have its own state
// if we have multiple instances of the same component then each component will have its own state
