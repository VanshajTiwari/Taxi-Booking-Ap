import axios from "axios";
import React from 'react'

const features =  {
    categories: "commercial",
    currLoc: "81.15595880167041,26.94569380201648",
    radius: "10000"
}
const API = "c76be36965954e5d983f79918d66625b"

function GetData() {
    async function getReq() {
        const url = `https://api.geoapify.com/v2/places?categories=${features.categories}&filter=circle:${features.currLoc},${features.radius}&bias=proximity:${features.currLoc}&limit=20&apiKey=${API}`
        const {data} = await axios.get(url)
        console.log("in the axios request",data)
    }
    getReq()
  }
  
  export default GetData






