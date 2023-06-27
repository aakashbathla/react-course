import React from "react";
import ReactDOM from "react-dom/client"; // React v18
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  //const styles = { color: "red", fontSize: "48px", textTransform: "uppercase" };
  const styles = {};

  return (
    <header className="header">
      <h1 style={styles}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  return (
    <main className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        {pizzaData.length > 0 ? (
          pizzaData.map((pizza, index) => {
            return (
              <Pizza
                name={pizza.name}
                ingredient={pizza.ingredients}
                photoName={pizza.photoName}
                price={pizza.price}
                soldOut={pizza.soldOut}
              />
            );
          })
        ) : (
          <p>No pizza found</p>
        )}
      </ul>
    </main>
  );
}

function Pizza({ photoName, name, ingredient, price, soldOut }) {
  return (
    <li className={`pizza ${soldOut ? "sold-out" : ""}`}>
      <img src={photoName} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>{ingredient}</p>
        <span>{soldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const hour = new Date().getHours();
  const openHour = 10;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour <= closeHour;
  console.log(isOpen);
  const footer = (
    <footer className="footer">
      <div className="order">
        <p>{new Date().toLocaleTimeString()}. We're Currently Open</p>
        <button className="btn" type="button">
          Place an Order
        </button>
      </div>
    </footer>
  );
  return isOpen && footer;
}

//never nest components inside other components
// In strict mode, React will throw an error if you nest components inside other components
// In strict mode, our component renders twice

//function name should start with uppercase and it needs to return some jsx

//JSX is mixture of JavaScript and HTML and CSS
// when jsx first came into the market people hated jsx mainly because of the mixing of html and javascript
// but now people love jsx because of the mixing of html and javascript
// jsx is not a requirement for react
// jsx is just a syntax extension for javascript
// jsx is a syntax extension for javascript and it is used with react to describe what the UI should look like
// one component per file
// React v18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Before React v18
//React.render(<App />, document.getElementById("root"));

// Imperative vs Declarative
// Imperative: How to do something
// Manual Dom element selection and DOM Traversing
// step-by-step DOM mutations until we reach the desired UI
// Declarative: What to do
// React: Declarative UI
// Describle the desired UI and React will take care of the DOM mutations

// props are immutable
// props are read-only
// props are used to pass data from parent to child component
// props are used to pass data from one component to another component

// props are immutable because they create side effect if directly change
// component have to be pure functions in terms of props and state
// This allows React to optimize apps, avoid bugs, make apps predictable

// React have one way data flow
// data flows from parent to child component
//make easier to debug
// more efficient
// easier to understand

//Avatar component
// Intro
// SkillList

// some general rule of jsx
// 1. always use camelCase for html attributes
// 2. always use className instead of class
// 3. always close every element
// 4. always use parenthesis for multiline jsx

// in jsx we can only write something which prdoces a single element
// if we need to pass key in react fragment then we need to use React.Fragment
// we can also use <> </> instead of React.Fragment
