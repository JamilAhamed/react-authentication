import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { createContext } from "react";
import { useState } from "react";
import Blog from "./Components/Blog/Blog";
import Contact from "./Components/Contact/Contact";
import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import SignUp from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import Destination from "./Components/Destination/Destination";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Destination from "./Components/Destination/Destination";

export const UserContext = createContext({});

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/home">
            <Home/>
          </Route>
          <PrivateRoute path="/destination/:name">
            <Destination></Destination>
          </PrivateRoute>

          {/* <PrivateRoute path="/destination/:name">
            <Destination></Destination>
          </PrivateRoute> */}

          <Route path="/signup">
            <SignUp/>
          </Route>
          <Route path="/login">
           <Login/>
          </Route>
          <Route path="/blog">
          <Blog/>
          </Route>
          <Route path="/contact">
           <Contact/>
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;