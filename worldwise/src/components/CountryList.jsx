import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";
function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length) {
    <Message message="Add your first city by clicking on a city on the map" />;
  }

  const countries = cities.filter((city, index, self) => {
    return index === self.findIndex((c) => c.country === city.country);
  });

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => {
        return <CountryItem key={country.id} country={country} />;
      })}
    </ul>
  );
}

export default CountryList;
