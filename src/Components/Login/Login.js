import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from "../../App";
import { useContext, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { initializeLoginFramework } from "../LogManager";

export default function Login() {
  let isFieldValid = true;
  initializeLoginFramework();
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    password: "",
    photo: "",
  });
  const [errorMessage, setErrorMessage] = useState();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = { from: { pathname: "/destination/:name" } };
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        const { displayName, email } = res.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        console.log(signedInUser);
        history.replace(from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
      });
  };
  const handleSignIn = (e) => {
    if (user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          console.log("error", error.message);
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setErrorMessage(error);
        });
    }
  };
  const handleBlur = (e) => {
    if (e.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === "password") {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
      console.log(isFieldValid);
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  };
  return (
    <div
       style={{ height: "100vh", backgroundColor: "green" }}
      className="Login">
      <Form>
        <div className="form-group">
          <>Email address</>
          <input onBlur={handleBlur} type="email" name="email" className="form-control" placeholder="Enter email"/>
          <label>Password</label>
          <input onBlur={handleBlur} type="password"  name="password" className="form-control" placeholder="Enter password"required/>
        </div>
        <Button onClick={handleSignIn} block size="lg">Login</Button>
        <h3 className="mt-3 p-3" style={{ color: "red" }}>
          {errorMessage?.message}
        </h3>
        <br/>
        <h5 className="p-5" style={{ color: "white" }}>
          If you are new; <br /> go to <Link to="/signup">Sign Up </Link> page
        </h5>
        <br/>
        <Button onClick={handleGoogleSignIn}
          className="google-btn container" variant="primary">Google Sign In
        </Button>
      </Form>
    </div>
  );
};