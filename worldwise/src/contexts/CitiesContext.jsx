import { useCallback, useContext, useReducer } from "react";
import { createContext, useEffect } from "react";
const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "loading":
      return { ...state, isLoading: true };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function CitiesProvider({ children }) {
  const [{ error, cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    dispatch({ type: "loading" });
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "cities/loaded", payload: data });
      })
      .catch((err) =>
        dispatch({
          type: "rejected",
          payload: "there was an error loading the data",
        })
      );
  }, []);

  const getCity = useCallback(
    function getCity(id) {
      if (+id === +currentCity.id) return console.log("already loaded");

      dispatch({ type: "loading" });
      fetch(`${BASE_URL}/cities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: "city/loaded", payload: data });
        })
        .catch((err) =>
          dispatch({
            type: "rejected",
            payload: "there was an error loading the data",
          })
        );
    },
    [currentCity.id]
  );

  function deleteCity(id) {
    dispatch({ type: "loading" });
    fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        dispatch({ type: "cities/deleted", payload: id });
      })
      .catch((err) =>
        dispatch({
          type: "rejected",
          payload: "there was an error deleting the city",
        })
      );
  }

  function createCity(newCity) {
    dispatch({ type: "loading" });
    fetch(`${BASE_URL}/cities/`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "cities/created", payload: data });
      })
      .catch((err) =>
        dispatch({
          type: "rejected",
          payload: "there was an error creating the city",
        })
      );
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

export { CitiesProvider, useCities };
