import * as React from "react";
import "./form.css"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "./Button";
import BottomLink from "./BottomLink";
import { ThemeProvider } from "@mui/material";
import Theme from "../Styles";
import { useState } from "react";
export default function BasicTextFields(props) {
  const [showpass, setShowpass] = useState(true)

  const styles = {

    "& fieldset": { border: "2px solid black" },
    input: { color: "black" },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "black",
      },
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      "& > fieldset": {
        borderColor: "black",
      },
    },
    label: { color: "black" },

  };

  return (
    <ThemeProvider theme={Theme}>

      <div className="form">
        <div className="heading-container">
          <h3>{props.title} Form</h3>
        </div>
        {props.title === "Login" ? (
          <Box
            className="box"
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="email">
              <TextField
                sx={styles}
                className="logemail"
                id="email"
                label="Enter the Email"
                variant="outlined"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <TextField
                sx={styles}
                className="logpass"
                id="password"
                type={showpass ? "password" : "text"}
                label="Enter the Password"
                variant="outlined"
                onChange={(e) => props.setPassword(e.target.value)}
              />
            </div>
          </Box>
        ) : (
          <Box
            className="box"
            component="form"
            sx={{
              "& > :not(style)": { m: 1 },
            }}
            noValidate
            autoComplete="off"
          >
            <div className="name">
              <TextField
                className="fname"
                sx={styles}
                id="Fname"
                label="Enter your First Name"
                variant="outlined"
                onChange={(e) => props.setFirstName(e.target.value)}
              />
              <TextField
                sx={styles}
                id="Lname"
                className="lname"
                label="Enter your Last Name"
                variant="outlined"
                onChange={(e) => props.setLastName(e.target.value)}
              />
            </div>
            <div className="email">
              <TextField
                sx={styles}
                fullWidth="true"
                id="email"
                type={"email"}
                label="Enter the Email"
                variant="outlined"
                onChange={(e) => props.setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <TextField
                sx={styles}
                className="pass"
                id="password"
                type={showpass ? "password" : "text"}
                label="Enter the Password"
                variant="outlined"
                onChange={(e) => props.setPassword(e.target.value)}
              />
              <TextField
                sx={styles}
                className="confpass"
                id="confirmPassword"
                type={showpass ? "password" : "text"}
                label="Renter the Password"
                variant="outlined"
                onChange={(e) => props.setConfirmPass(e.target.value)}
              />
            </div>
          </Box>
        )}
        <div className="checkbox">
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    "& .MuiSvgIcon-root": { fontSize: 28 },
                    color: 'black',
                    "&.Mui-checked": {
                      color: 'black',
                    },
                  }}
                  onChange={() => { setShowpass(!showpass) }}
                />
              }
              label="Show Password"
              sx={{ color: 'black' }}
            />
          </FormGroup>
        </div>

        <div className="bottom">
          <Button
            title={props.title}
            handleAction={props.handleAction}
            disabled={props.disabled}
            setDisabled={props.setDisabled}
          />
          <BottomLink title={props.title} />
        </div>
      </div>
    </ThemeProvider>
  );
}
