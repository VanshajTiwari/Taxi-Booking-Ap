
import { createTheme } from "@mui/material";

const color = {
    primary: "#ff4f5a",
    secondary: "#4FFFF4"
}

const theme = createTheme({
    palette: {
        primary: {
            main: color.primary
        },
        secondary: {
            main: color.secondary
        }
    }
})

export default theme;