/* eslint-disable react-hooks/rules-of-hooks */
// import logo from './logo.svg';
import React, { useEffect, useState } from "react";
import Button from './Components/Common/Button';
import { Routes, Route, useNavigate } from "react-router-dom";
import Form from "./Components/Common/Form";
import "./App.css";
import Reshape from "./Reshape";
import { app } from "./firebase-config";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (authToken) {
      navigate("/Reshape");
    }
  }, []);

  //main logic here for authentication and session----------------------------------
  const handleAction = (id) => {
    const authentication = getAuth();
    if (id === 2) {
      if (
        firstName === "" ||
        lastName === "" ||
        email === "" ||
        password === ""
      ) {
        toast.error("Please fill all the entries");
        setDisabled(false);
      } else {
        if (password === confirmPass) {
          createUserWithEmailAndPassword(authentication, email, password)
            .then((res) => {
              toast.success("Successfully Registered")
              navigate("/Reshape");
              const user = res.user;
              updateProfile(user, {
                displayName: firstName + " " + lastName,
              });
              setDisabled(false);
              sessionStorage.setItem(
                "Auth Token",
                res._tokenResponse.refreshToken
              );
              sessionStorage.setItem("User", firstName + " " + lastName);
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                toast.error("Email Already in Use");
              }
              setDisabled(false);
            });
        } else {
          toast.error("Password and Confirm password do not match");
          setDisabled(false);
        }
      }
    }

    if (id === 1) {
      signInWithEmailAndPassword(authentication, email, password)
        .then((res) => {
          navigate("/Reshape");
          toast.success("Successfully Logged In")
          // console.log(res);
          setDisabled(false);
          sessionStorage.setItem("Auth Token", res._tokenResponse.refreshToken);
          sessionStorage.setItem("User", res.user.displayName);
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            toast.error("Please check the Password");
          }
          if (error.code === "auth/user-not-found") {
            toast.error("Please check the Email");
          }
          setDisabled(false);
        });
    }
  };
  // ----------------------------------------------------------------------------------------

  //1 for login action and 2 for register action
  //all the routes are here
  return (
    <div className="App">
      <div className="Container">
        <ToastContainer />
        <Routes>
          <Route
            path="/login"
            element={
              <Form
                title="Login"
                setEmail={setEmail}
                setPassword={setPassword}
                disabled={disabled}
                setDisabled={setDisabled}
                handleAction={() => handleAction(1)}
              />
            }
          />
          <Route
            path="/"
            element={
              <Form
                title="Register"
                setEmail={setEmail}
                setPassword={setPassword}
                setConfirmPass={setConfirmPass}
                setFirstName={setFirstName}
                setLastName={setLastName}
                disabled={disabled}
                setDisabled={setDisabled}
                handleAction={() => handleAction(2)}
              />
            }
          />
          <Route path="/Reshape" element={<Reshape />} />
        </Routes>
        {/* <div className="img"></div> */}
        <div className="img"></div>
      </div>
    </div>
  );
}

export default App;
