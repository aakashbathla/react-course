import { useState } from "react";

const content = [
  {
    id: 1,
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} onClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} onClick={setActiveTab} />
      </div>

      {activeTab <= 2 ? (
        <TabContent
          key={content.at(activeTab).id}
          item={content.at(activeTab)}
        />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ num, activeTab, onClick }) {
  return (
    <button
      className={activeTab === num ? "tab active" : "tab"}
      onClick={() => onClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  console.log("RENDERING");

  function handleInc() {
    setLikes(likes + 1);
  }

  function handleInc3() {
    // setLikes(likes + 1);
    // setLikes(likes + 1);
    // setLikes(likes + 1);

    setLikes((l) => l + 1);
    setLikes((l) => l + 1);
    setLikes((l) => l + 1);
  }

  function handleUndo() {
    setShowDetails(true);
    setLikes(0);
  }

  function handleUndoLater() {
    setTimeout(() => {
      setShowDetails(true);
      setLikes(0);
    }, 2000);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button onClick={handleInc3}>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button onClick={handleUndo}>Undo</button>
        <button onClick={handleUndoLater}>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}

// we can use .at instead of []
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at
// content.at(activeTab) is same as content[activeTab]

// component -> component instances -> react elements -> DOM elements

// how rendering works

// when state updates, react re-renders the component
// render is triggered
// render phase

// in react, rendering is not updating the dom or displaying elements on the screen.
// rendering is the process of updating the virtual dom, it does not produced visual changes.

// after render phase commit phase starts
// commit phase
// react compares the virtual dom with the real dom and updates the real dom with the changes
// react actually writes to the DOM, updating, inserting and deleting elements

// browser notince DOM has been updated and re-paints the screen

// the two situations that trigger renders
// 1. initial render of the appplication
// 2. state is updated in one or more component instances (re-rendering)

// the render process is triggered for the entire application
// react looks enter the entire tree before it starts to render
// react starts at the root component and works its way down the tree
// react will render all the components in the tree
// renders are not triggered immediately, but scheduled for when the JS engine has some free time
// there is also batching of multiple setState calls in event handlers

// virtual dom
// tree of all react elements crated from all instances of all components tree
// virtual dom is a representation of the real dom
// virtual dom is a tree of react elements
// react elements are plain JS objects
// react elements are lightweight and cheap to create
// react elements are immutable
// react elements are not the same as DOM elements
// react elements are not the same as component instances
// react elements are not the same as components

// shadow dom
// shadow dom is used in stuff like web components
// shadow dom is a browser feature
// shadow dom is a tree of DOM elements
// shadow dom is a way to encapsulate DOM elements
// shadow dom is a way to create components in the browser
// shadow dom is a way to create custom elements in the browser
// shadow dom is a way to create web components
// shadow dom is a way to create reusable components
// shadow dom is a way to create components with their own styles
// shadow dom is a way to create components with their own markup
// shadow dom is a way to create components with their own behavior
// shadow dom is a way to create components with their own lifecycle
// shadow dom is a way to create components with their own state
// shadow dom is a way to create components with their own events
// shadow dom is a way to create components with their own API
// shadow dom is a way to create components with their own children

// rendering a component will cause all of its child components
// to render as well (no matter if props changed or not)

// necessary because react doesn't know whether children will be affected by the change
// new virual dom is created and compared to the old virtual dom
// if there are differences, the real dom is updated
// the process is known as reconciliation or diffing
// it is done by using fiber data structure

// virual dom + reconciliation + fiber = react

// reconcillation decides which dom elements actually need to be updated
// inserted, deleted in order to reflect the latest state changes
// current reconciller in the react is known as fiber reconciller

// fibre tree are never destroyed, it's a immutable data structure
// fibre tree is created from the virtual dom

// work of fibre tree

// current state
// current props
// side effects
// used hooks
// queues of work

// 1. it keeps track of the changes that need to be made to the dom
// 2. it keeps track of the changes that need to be made to the component instances
// 3. it keeps track of the changes that need to be made to the react elements

// fibre tree follow linked list

// work can be done asynchronously
// rendereing process can be split into chunks, taska can be prioritized and work
// can be paused, aborted or resumed

// enables concurrent features like suspense or transitions
// long renders won't block JS engine

// component instances that triggered re-render +
// react element
// virtual dom
// fibre tree
// reconciller
// updated fibre tree
// list of dom updates
// dom updates
// React writes to the DOM: inserts, deletions, and updates (list of dom updates are "flushed" to the dom)
// committing is synchronous: DOM is updating in one go
// after the commit phase cmpletes, the workinprogress fibre tree becomes the current fibre tree for the next render cycle
// after that browser raises a paint event and the screen is updated
// react dom do all of the dom work not the react library
// we don't use react only for web work
// we can use it for mible applications as well such by using react native library we can build ios and android applications
// with remotion we can create videos with react
// react have different renderer for different platforms
// react dom is the default renderer for web
// react native is the renderer for ios and android
// react three fiber is the renderer for three js
// react art is the renderer for canvas
// react konva is the renderer for canvas
// remotion is the renderer for video
// the commit phase

// how diffing works
// diffing uses two fundamental assumptions
// same position, different element
// same position, same element

/* <div>
  <searchbar/>
</div> */

/* <header>
  <searchbar/>
</header> */

//different dom element
// react assumes entire subtree has changed
// old subtree is unmounted
// new subtree is mounted
// old components are destroyed and removed from dom, including state
// tree might be rebuit if children stayed the same (state is reset)

// if same position, same element
// react assumes nothing has changed
// old subtree is kept
// new subtree is ignored
// old components are kept, including state

// now what if we don't want to keep the state of the component
// we can use key prop to tell react that the component is different
// and it should not keep the state of the component
// special prop that we use to tell the diffing algorithm that the component is different
// allows react to distinguish between different instances of the same component

// when a key between renders, the element will be destroyed and recreated
// event if the position in the tree is the same as before

// using keys to reset state
// keys are not meant to be used to force re-rendering
// why to use key in the list
// if we don't use key in the list, react will use index as key
// if we add or remove an item from the list, react will re-render the entire list
// if we use key, react will only re-render the item that has changed
// different position in the tree, but te key stays the same, so the elements will be kept in the DOM
// whenever you want to reset the state of the compnent just pass key to the component
// key is not a prop, it is a special attribute that react uses internally

// we use two types of logic in react component
// 1. render logic
// cod ethat lives at the top lievel of the component function
// participates in describing how the component view looks like
// executed every time the component renders
// 2. event logic
// executed as a consequence of the event that the handler is listening for
// code that acually does things: update state, perform an http request, read an input field, navigate to another page, etc.
// create as much as pure functions as possible
// pure functions are functions that don't have side effects
// pure functions are functions that don't mutate data
// pure functions are functions that don't have any dependencies on the outside world
// state update batching
// react batches state updates
// react batches state updates that are triggered synchronously
// renders are not triggered immediately, but scheduled for when the JS engine has some free time
// there is also batching of multiple setState calls in event handlers
// jus one render and commit per event handler
// automatic batching at all times, everywhere after react 18+
// timeout, promise and native events are not batched in react 17 but in react 18 they are batched
// we can opt out of automatic batching by wrapping a state update in a ReactDOM.flushSync() call

// each time when we set state based on the previous state we should use callback function
// because react batches state updates, we can't rely on the previous state value
/// batching happens in event handlers as well as promises and timeouts in react 18

// how react handle events
// react uses event delegation
// react attaches a single event listener to the root of the document
// react uses event delegation to listen for events that occur anywhere in the document
// react bundles all the click handlers and applies it to the root of the document
// this is yet antohter important function of fibre tree
// behind the scenes react uses event delegation to listen for events that occur anywhere in the document
// event catpturing going from top to bottom and event bubbling is going from bottom to top
// how these event objects actually work behind the scenes
// event object is a synthetic event object
// synthetic events fix cross browser inconsistencies, so that event works in the exact same way in all browsers
// most synthetic events bubble (including foucs and blur and change) except for scroll
// in react we have to use event.preventDefault() to prevent default behaviour of the event
// we can't simply return false from the event handler
// just add capture to the event listener, to handle event from top to bottom

// react is a library not a framework
// all in one kit is a framework
// separate ingrediet is a library
// Next.js is a framework that is built on top of react
// next.js and remix have http requests and styling and routing and form management included in it
