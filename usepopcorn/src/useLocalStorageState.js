import { useState, useEffect } from "react";
export function useLocalStorageState(watchedMovies, key) {
  const [watched, setWatched] = useState(function () {
    const savedWatched = localStorage.getItem(key);
    if (savedWatched) {
      return JSON.parse(savedWatched);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(watchedMovies));
  }, [key, watchedMovies]);
  return [watched, setWatched];
}
