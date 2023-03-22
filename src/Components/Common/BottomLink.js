import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function BottomLink(props) {
    let navigate = useNavigate();
    
  return (
    <>
      {props.title === "Login" ? (
        <p>
          Not Registed? <span onClick={ () => navigate('/')} >Register</span>
        </p>
      ) : (
        <p>
          Already registerd? <span onClick={ () => navigate('/login')} >Login</span>
        </p>
      )}
    </>
  );
}
