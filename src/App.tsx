import { Box, CssBaseline } from "@mui/material";
import { ApiKeyContextProvider } from "./api/key";
import { ThemeContextProvider } from "./theme/ThemeContextProvider";

import ChatBox from "./components/ChatBox";

const App = () => (
  <ThemeContextProvider>
    <CssBaseline />
    <ApiKeyContextProvider>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        sx={{ width: "100vw", height: "100vh", maxHeight: "100vh" }}
      >
        {/* <TopBar /> */}
        <ChatBox />
      </Box>
    </ApiKeyContextProvider>
  </ThemeContextProvider>
);

export default App;
