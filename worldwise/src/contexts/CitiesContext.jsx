import { useContext } from "react";
import { createContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

function reducer(state, action) {}

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});
  useEffect(() => {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities`)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);x
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  function getCity(id) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCurrentCity(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function deleteCity(id) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setCities((city) => cities.filter((city) => city.id !== id));
        setIsLoading(false);
      })
      .catch((err) => alert("There was an error deleting city"))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function createCity(newCity) {
    setIsLoading(true);
    fetch(`${BASE_URL}/cities/`, {
      method: "POST",
      body: JSON.stringify(newCity),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCities((city) => [...city, data]);
        setIsLoading(false);
      })
      .catch((err) => alert("There was an error creating city"))
      .finally(() => {
        setIsLoading(false);
      });
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
