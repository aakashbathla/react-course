import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// abstraction - creating something new to hide the implementation deatils of that thing
// encapsulation - hiding the implementation details of an object
// polymorphism - the ability to call the same method on different objects and have each of them respond in their own way
// inheritance - the ability to create a class that inherits properties and methods from another class
// composition - the ability to combine simple objects or data types into more complex ones

// be aware that creating a new component creates a new abstraction. Abastractions have a cost, because more abstractions require more mantal enrgy to swich back and form betwen components. so try not to crate new components too early
// name a component based on what it does, not what it looks like
// use composition to reuse code between components
// never declare a component inside of another component
// co-locate related components inside the same file. don't separate them into different files
