import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MyComponent from "./Select";
import InputSlider from "./distace";
import CurrentLoc from "./CurrentLoc";
import Mode from "./SelectDrive";
import axios from "axios";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3000");

function Input({ render, currentLocation, setFeatures, setLocations }) {
  // console.log("in input",currentLocation)
  const [values, setValues] = useState({
    currloc: "",
    // type: "",
    // radius: "",
    // mode: "",
  });

  const [drivers, setDrivers] = useState([]);

  // const [nextStage, setNextStage] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeatures(values);
    // setNextStage(!nextStage)
    console.log("submitted");
  };

  function postData(url) {
    const data = {
      latlng: currentLocation,
    };

    axios
      .post(url, data)
      .then(function (response) {
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  // socket.on('connect', () => {
  //   console.log('connected in frontend');
  // })

  useEffect(() => {
    socket.on('all-loc', (data) => {

      setDrivers(prev => {

        prev.forEach(element => {
          if (element.id === data.id) {
            prev.splice(prev.indexOf(element), 1);
          }
        });

      return [...prev,data]
    });
  
      // setLocations(drivers)
    });
  },[socket])

  useEffect(() => {console.log(drivers)
    setLocations(drivers)
  },[drivers])

  useEffect(() => {
    setValues({
      ...values,
      currloc: currentLocation
        ? `${currentLocation.lng},${currentLocation.lat}`
        : " ",
    });
    // postData("http://localhost:3000/")

    // eslint-disable-next-line no-unused-expressions
    currentLocation
      ? socket.emit("SH-CO", { id: socket.id, pos : currentLocation })
      : null;
    
  }, [currentLocation]);

  // console.log(values)

  return (
    <FormContainer>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        action=""
      >
        {/* <MyComponent qdata={values} setDetails={setValues}/> */}
        <CurrentLoc render={render} currentLoc={currentLocation} />
        {/* <InputSlider qdata={values} setDetails={setValues}/> */}
        <button type="submit">Submit</button>
      </form>
    </FormContainer>
  );
}

const FormContainer = styled.div`
  height: 400px;
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  overflow: hidden;
  border-radius: 2rem;
  margin-left: 30px;
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 85%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Input;
