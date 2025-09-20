import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: { main: "#d6590a", dark: "#b14b08" },
        secondary: { main: "#954916" },
        background: { default: "#f5f5f7", paper: "#ffffff" },
        text: { primary: "#1f1f1f", secondary: "#7a7a7a" },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', sans-serif",
    },
    components: {
        MuiButton: { styleOverrides: { root: { borderRadius: 12, textTransform: "none" } } },
        MuiIconButton: { styleOverrides: { root: { color: "#1f1f1f" } } },
    },
});

export default theme;
