import { useState, useRef, useEffect } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery("");
  });

  useEffect(() => {
    function callback(e) {
      if (e.code === "Enter") {
        inputEl.current.focus();
        setQuery("");
      }
    }

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [setQuery]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />

      {children}
    </nav>
  );
}

// function Box({ element }) {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <div className="box">
//       <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
//         {isOpen ? "–" : "+"}
//       </button>
//       {isOpen && element}
//     </div>
//   );
// }

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

// function WatchedBox() {
//   const [watched, setWatched] = useState(tempWatchedData);

//   const [isOpen2, setIsOpen2] = useState(true);

//   return (
//     <div className="box">
//       <button
//         className="btn-toggle"
//         onClick={() => setIsOpen2((open) => !open)}
//       >
//         {isOpen2 ? "–" : "+"}
//       </button>
//       {isOpen2 && (
//         <>
//           <WatchedSummary watched={watched} />
//           <WatchedMovieList watched={watched} />
//         </>
//       )}
//     </div>
//   );
// }

function MovieList({ movies, onSelectMovie }) {
  return (
    <ul className="list list-movie">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          key={movie.imdbID}
          movie={movie}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function Main({ children }) {
  return (
    <>
      <main className="main">{children}</main>
    </>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function SelectedMovie({ selectedId, onCloseMovie, onAddToWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isloading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");
  const countRef = useRef(0);
  useEffect(() => {
    if (userRating === "") return;
    countRef.current = countRef.current + 1;
  }, [userRating]);

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserrating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Year: year,
    Poster: poster,
    imdbRating,
    Runtime: runtime,
    Plot: plot,
    Released: released,
    Genre: genre,
    Director: director,
    Actors: actors,
  } = movie;

  // but this one won't work
  // const [isTop, setIsTop] = useState(imdbRating > 8);

  // below one will work
  // useEffect(() => {
  //   setIsTop(imdbRating > 8);
  // }, [imdbRating]);

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ")[0]),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    };
    onAddToWatched(newWatchedMovie);
    onCloseMovie();
  }
  useKey("Escape", onCloseMovie);
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await response.json();
        setMovie(data);
        setIsLoading(false);
      } catch (error) {}
    }
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `${title} | Movie App`;
    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isloading && <Loader />}
      {!isloading && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`${title} poster`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched && (
                <p>
                  You rated this movie {watchedUserrating}
                  <span>⭐️</span>
                </p>
              )}
              {!isWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

const KEY = "ac7de8e1";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  const { movies, isLoading, error } = useMovies(query);

  function handleAddToWatched(movie) {
    setWatched((watched) => [...watched, movie]);

    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  }

  function handleRemoveFromWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useLocalStorageState(watched, "watched");

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        {movies && <NumResults movies={movies} />}
      </Navbar>
      <Main>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        /> */}

        <Box>
          {/* {isLoading ? <Loader /> : <MovieList movies={movies} />} */}
          {!isLoading && !error && (
            <MovieList onSelectMovie={handleSelectMovie} movies={movies} />
          )}
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddToWatched={handleAddToWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleRemoveFromWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// calling an api is known as a side effect
// useEffect is a hook that allows us to do side effects
// basically interacting with the outside world
// we can't create useEffect as async

// useEffect is about component synchronization with the outside world
// it updates on every render so we need to be careful with it and pass dependencies array

//layout effect runs before the browser paints the screen
//useEffect runs after the browser paints the screen
// layout effect is another type of effect that is very rarely necessary (useLayoutEffect)

// cleanup function of react runs at two different occasions
// 1. when the component is unmounted
// 2. when the component is re-rendered
// cleanup function is a function that is returned from useEffect
// useEffect(() => {
//   const interval = setInterval(() => {
//     console.log("hello");
//   }, 1000);
//   return () => {
//     clearInterval(interval);
//   };
// }, []);

// remember one rule
// each effect should do one thing and one thing only
// if you need to do multiple things, use multiple effects
// this makes effects easier to clean up

// you can clean the timer
// you can remove the event listener
// you can cancel the request
// you can remove the subscription
// you can close the socket
// you can remove the observer
// you can abort the fetch
// you can cancel the animation
// you can remove the cache
// you can remove the database
// you can remove the temp files
// you can remove the log files
// you can remove the cookies

// useEffect(() => {
//   document.addEventListener("keydown", function (e) {
//     if (e.key === "Escape") {
//       onCloseMovie();
//     }
//   });

//   return function () {
//     document.removeEventListener("keydown", function (e) {
//       if (e.key === "Escape") {
//         onCloseMovie();
//       }
//     });
//   };
// }, [onCloseMovie]);

// mandatory to remove the event after we are adding it to the dom

// hooks are special built-in functions that allow us to "hook" into the react internals
// hooks are functions that allow us to use react features in functional components
// creating and accessing the state from fiber tree
// registering side effects in fiber tree
// manual DOM selections
// always start with "use" keyword useSate, useEffect, useLayoutEffect, useRef, useMemo, useCallback, useContext, useReducer, useImperativeHandle, useDebugValue
// enable easy reusing of non-visual logic: we can compose multiple hooks into our own custom hooks
// only call hook at the top level of the functional component
// only call hook from react functions

//useState will take only the initial value it won't update it later on re-render
// we can only update it by using the setter function
// const [isTop, setIsTop] = useState(imdbRating > 8);
// above will not work because at first it receives undefined and then it will always be false
// we can also pass callback function in the useState
// const [isTop, setIsTop] = useState(() => imdbRating > 8);
// this will work because it will only be called once
// const [watched, setWatched] = useState(function () {
//   const savedWatched = localStorage.getItem("watched");
//   if (savedWatched) {
//     return JSON.parse(savedWatched);
//   }
//   return [];
// });
// useSte based on function (lazy evaluation)
// function must be pure and accept no arguments. Called only on the initial render
// we should not select dom elements directly in react
// we should use useRef hook to select dom elements

// ref -> box object with a mutable .current property that is
// persistent across re-renders ("normal" variables get reset on every re-render)")
// two big use cases:
// 1. accessing dom elements
// 2. storing mutable values that are persistent across re-renders (previousSate, setTimeout id, etc.)

// Regs are for data that is not rendered: usuaylly only appear in event handlers
// or effects, not in JSX (otherwise use state)
// do not read write or read .current in render logic (like state)
// difference between state and ref
// state persist across re-renders
// ref persist across re-renders
// state updating causes re-render
// ref updating does not cause re-render
// state are immutable
// ref are mutable
// state udpates are async and batched
// ref updates are sync and immediate
// we cannot mutate the ref in the render function
// we can mutate the ref in the event handler

// reusing logic with custom hooks
// if you need to use ui then use component
// if you need to use logic that doesn't contain hooks then use regular function
// if you need to use logic that contains hooks then use custom hook
// custom hooks are just regular functions that use hooks
// one custom hook should have one purpose, to make it reusable and portable
// custom hooks should be named useSomething
// custom hooks should not contain any jsx
// custom hooks can have one or more hooks
// they can receive and return any relevant data
// with custom hook we only share logic not the jsx
// we can also return a function from the custom hook
// then we can call that function in nested component
