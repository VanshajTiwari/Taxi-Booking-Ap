/* eslint-disable array-callback-return */
import React from "react";
import "../components/myMap.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvent,
  useMap,
  Polyline,
} from "react-leaflet";
import "leaflet";
import { useState, useEffect } from "react";
import Input from "../components/input";

function myMap() {
  var socket;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [position, setPosition] = useState(null);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [features, setFeatures] = useState({});

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [locations, setLocations] = useState([]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [renderGL, setRenderGL] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [endpoint, setEndpoint] = useState('http://localhost:3000/')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [pathTo, setPathTo] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [polyLineArray, setPolyLineArray] = useState([])

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const API = "c76be36965954e5d983f79918d66625b";
  const purpleOptions = {
    color: "#00ffff",
    weight: 8,
    opacity: 0.8,
  };
  

  // const multiPolyline = [
  //   [
  //     [51.5, -0.1],
  //     [51.5, -0.12],
  //     [51.52, -0.12],
  //   ],
  //   [
  //     [51.5, -0.05],
  //     [51.5, -0.06],
  //     [51.52, -0.06],
  //   ],
  // ]

  function render() {
    setRenderGL(true);
  }

  function LocationMarker() {
    const map = useMapEvent({
      click(e) {
        setPosition(e.latlng);
        // setPolyLineArray([])
        map.flyTo(e.latlng, map.getZoom());
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>You are here</Popup>
      </Marker>
    );
  }

  function LocationMarkerGet() {
    const map = useMap();
    if (renderGL) {
      map.locate().on("locationfound", function (e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        setRenderGL(false);
      });
    }
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {console.log(locations)}, [locations]);

  // function handleMarkerData(e) {
  //   const mar = e.target
  //   console.log(mar.options.data); // logs position.
  // }

  // async function getReq() {
  //   const url = `https://api.geoapify.com/v2/places?categories=${features.type}&filter=circle:${features.currloc},${features.radius}&bias=proximity:${features.currloc}&limit=5&apiKey=${API}`;
  //   const { data } = await axios.get(url);
  //   console.log("in the axios request", data);
  //   // for (let i of data.features) {
  //   //   console.log(i.properties.lat)
  //   //   let pos = {lat: i.properties.lat, lng: i.properties.lon}
  //   // }
  //   setLocations(data.features)
  // }
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   getReq();
  // }, [features]);

  // async function getPath() {
  //   const url = `https://api.geoapify.com/v1/routing?waypoints=${position.lat},${position.lng}|${pathTo}&mode=${features.mode}&apiKey=${API}`
  //   const {data} = await axios.get(url)
  //   // console.log("in path function",data.features[0].geometry.coordinates[0])
  //   const temp = (data.features[0].geometry.coordinates[0])
  //   console.log(temp)
  //   for (let i of temp){
  //     i.reverse()
  //   }
  //   setPolyLineArray(temp)
  // }
  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   getPath();
  // }, [pathTo]);

  // console.log(polyLineArray)

  // position?console.log(position.lat):console.log("not yet loaded");
  return (
    <div className="Container">
      <div className="leaflet-container">
        <MapContainer center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker />
          <LocationMarkerGet />
          {locations.map((i, index) => (
            <Marker
              key={index}
              position={[i.pos.lat, i.pos.lng]}
              data={[i.pos.lat, i.pos.lng]}
              // eventHandlers={{
              //   click: (e) => {
              //     // console.log(e.target.options.data);
              //     setPathTo(e.target.options.data)
              //   }
              // }}
            >
              <Popup>location</Popup>
            </Marker>
          ))}
          {/* <Polyline pathOptions={ purpleOptions } positions={multiPolyline} /> */}
          {/* <Polyline pathOptions={purpleOptions} positions={polyLineArray} /> */}
        </MapContainer>
      </div>
      <Input
        render={render}
        setLocations={setLocations}
        setFeatures={setFeatures}
        currentLocation={position}
      />
    </div>
  );
}

export default myMap;
