import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from './Common/Button'
import './Home.css'

export default function Home() {
  const handleLogout = () => {
    sessionStorage.removeItem("Auth Token");
    sessionStorage.removeItem("User");
    navigate("/login");
  };

  const [disabled, setDisabled] = useState(false);
  let navigate = useNavigate();
  useEffect(() => {
    let authToken = sessionStorage.getItem("Auth Token");
    if (!authToken) {
      navigate("/login");
    }
  }, []);
  let user = sessionStorage.getItem("User")
  return (
    <div clasName="hone">
      <div className="navUser"> Welcome <span style={{ color: '#ff4f5a' }} > {user} </span></div>
      <Button className="navUse " handleAction={handleLogout} setDisabled={setDisabled} title={'logout'} />

    </div>
  );
}
