import { ThemeProvider, CssBaseline } from "@mui/material";
import ChatPage from "./pages/ChatPage";
import theme from "./theme";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <ChatPage />
        </ThemeProvider>
    );
}

export default App;
