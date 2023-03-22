import "./Reshape.css";

import React, { useRef, useEffect, useState } from "react";
import { features } from "./routes/features";

// import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import DashBoard from "./component/Dashboard";
import "./component/Dashboard.css"
import Map, { Marker, Source, Layer } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibHVrZWdvb2RtYW4iLCJhIjoiY2xmY3Z1b3YwM2VibzN4cjBqdzN1dXo5MCJ9.XP6LDMSTUCvktkigCt0xlg"; // Set your mapbox token here

//mapboxgl.accessToken = "pk.eyJ1IjoibHVrZWdvb2RtYW4iLCJhIjoiY2xmY3Z1b3YwM2VibzN4cjBqdzN1dXo5MCJ9.XP6LDMSTUCvktkigCt0xlg";






export default function Reshape() {
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  const [coordinates, setCoordinates] = useState([
    [
      77.593968,
      27.602082
    ],
    [
      77.59536,
      27.605919
    ]
  ])

  const [dataOne, setDataOne] = useState({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [
        [
          77.593968,
          27.602082
        ],
        [
          77.59536,
          27.605919
        ]
      ]
    }
})

useEffect(() => {

  // console.log(coordinates)

  setDataOne({
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coordinates[0]
    }
  })

}, [coordinates])


useEffect(() => {

  // console.log(dataOne)

}, [dataOne])


  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <Map
        initialViewState={{
          latitude: 27.602082,
          longitude: 77.593968,
          zoom: 14,
        }}
        style={{ width: 925, height: 500 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {
          features.map(loc => {
            return <Marker longitude={loc.geometry.coordinates[0]} latitude={loc.geometry.coordinates[1]} color="red" />
          })
        }
      <Source id="polylineLayer" type="geojson" data={dataOne}>
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round"
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5
            }}
          />
        </Source>

      </Map>
        <DashBoard setCoordinates={setCoordinates} />
    </div>
  );
}