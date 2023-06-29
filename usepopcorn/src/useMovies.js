import { useState, useEffect } from "react";
const KEY = "ac7de8e1";
export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    async function asyncFetch() {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&S=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error(data.Error);
        setMovies(data.Search);
        setError(null);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError(null);
      return;
    }
    // handleCloseMovie();
    asyncFetch();

    return () => {
      controller.abort();
    };
  }, [query]);
  return { movies, isLoading, error };
}
