import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["Terrible", "Meh", "OK", "Good", "Great"]}
      onSetRating={(rating) => console.log(rating)}
    /> */}
  </React.StrictMode>
);

// our components will fall into three categories:
// 1. stateless components
// 2. stateful components
// 3. structure components

// we can pass element as well as children to avoid prop drilling

/* <Main>
        <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        />

        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedMovieList watched={watched} />
        </Box>
      </Main> */

// using children is the proper way to do it

// How react works

// initial render/ mounted
