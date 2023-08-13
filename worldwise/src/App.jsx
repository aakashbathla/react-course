import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:cityId" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
export default App;

// routing -> we match each url to a specific react component
// when the url is visited our component that is linked to url is rendered
// with navlink we get active class when we are on that page
// navlink is used to create links to different pages
// differnt type of styling react applications
// inline styling
// css modules
// css in js
// css in js is the most popular way of styling react applications
// css or sass files
// utility first css like tailwind css
// css modules changes the id of the class name
// css modules is the most popular way of styling react applications
// in css moduesl we can define global styles
// :global(.class-name) {}
// while writing css modules we use camelcasing
// index route is the route that apply on child to match it with the parent
// we can also place state in url and then access it anywhere
// we can also use params in url
// we can also use query params in url
// we can also use hash in url
// useSearchParams is used to get the search params from url
// useNavigate is used to navigate to different pages
// we can also use useLocation to get the location of the url
// we can also use useMatch to get the match of the url
// we can also use useOutlet to get the outlet of the url
// we can also use useRoutes to get the routes of the url
// we can also use useResolvedPath to get the resolved path of the url
// useParams is used to get the params from url
// outlet is used to render the child routes
// browser router is used to wrap the routes
// routes is used to wrap the route
// route is used to wrap the element
// link is used to wrap the navlink
// navlink is used to wrap the link
// navigate have replace and state property
