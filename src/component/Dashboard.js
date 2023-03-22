import React, { useEffect, useState } from "react";
import Select from "react-select";
import { routes } from "../routes/routesdata";
import { okay } from "../routes/routeee";
import io from "socket.io-client";
import "./Dashboard.css";
import { FaUser } from "react-icons/fa";

import Driver from './driver'
// const socket = io.connect("http://localhost:4200");

const socket = io.connect("http://localhost:4200");

export default function DashBoard(props) {
  const handleChange = (e) => {
    setStartMap(e.target.value);
    setDestiMap(e.target.value);
    // socket.emit("route-added", {id: socket.id, route: e.value});
  };
  // let [startMap,setStartMap]=useState("");

  // let[destiMap,setDestMap]=useState("");

  const [startMap, setStartMap] = useState("");
  const [destiMap, setDestiMap] = useState("");
  const [route, setRoute] = useState("");
  const [drivers, setDrivers] = useState([]);

  const [selectedDriver, setSelectedDriver] = useState("")



  useEffect(() => {
    if (route && destiMap && startMap) {
      socket.emit("user-dest-select", {
        route,
        startMap,
        destiMap,
        id: socket.id,
      });
    }
  }, [startMap, destiMap]);




  useEffect(() => {

    socket.on("show-drivers", (data) => {
      if (socket.id === data.to) {
        // console.log(data);
        setDrivers(data.AB1_riders);
      }
    });

    socket.on('draw-route', res => {
      if (res.for === socket.id){
        // console.log(res);
        props.setCoordinates(res.data2.features[0].geometry.coordinates);
      }
    })

    socket.on('user-accepted', data => {
      if (socket.id === data.to){
        alert("ride booked")
      }
    })

    socket.on('user-rejected', (data) => {
      if (socket.id === data.to) {
        alert("ride is full");
      }
    })


  }, [socket]);




  useEffect(() => {

    console.log("selected driver is " + selectedDriver)

    if (selectedDriver) {
      socket.emit("driver-select", {to: selectedDriver, id: socket.id})
    }
    
  }, [selectedDriver]);



  const display = (e) => {
    e.preventDefault();
     console.log(startMap + " To " + destiMap);
  };

  return (
    <div>
      <div className="navbaar">
        <img src="./logo.jpg" />
        <FaUser className="userico" icon="fa-solid fauser" />
        <span>Vanshaj Tiwari</span>
        <button>Log Out</button>
      </div>
      <div className="icoio">
        <img src="https://img.icons8.com/ios-filled/50/9CA3AF/filled-circle.png" />
        <img src="https://img.icons8.com/ios/50/9CA3AF/vertical-line.png" />
        <img src="https://img.icons8.com/windows/50/000000/square-full.png" />
      </div>
<div className="formfam">
      <div className="lower" >

      <form>
        <Select
          className="selectkaro"
          options={okay}
          onChange={(e) => setRoute(e)}
          placeholder="select route"
        />

        <Select
          values={startMap}
          className="selectkaro"
          options={routes}
          onChange={(e) => setStartMap(e)}
          placeholder="Your Location"
        />
        <Select
          // value={destiMap}
          className="selectkaro"
          options={routes}
          onChange={(e) => setDestiMap(e)}
          placeholder="Destination"
        />
        <button type="submit" onClick={(e) => display(e)}>
          Confirm
        </button>
      </form>
      </div>

      <div className="drivers">
        {
        drivers.map((driver) => <Driver id={driver.id} setSelectedDriver={setSelectedDriver} /> )
        }
      </div>

      </div>

    </div>
  );
}
