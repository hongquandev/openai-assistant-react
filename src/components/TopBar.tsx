import { AppBar, Toolbar, Tooltip, IconButton, useTheme } from "@mui/material";
import KeyPopper from "./KeyPopper";
import GitHubIcon from "@mui/icons-material/GitHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

import { useThemeContext } from "../theme/ThemeContextProvider";

const TopBar = () => {
  const theme = useTheme();
  const { toggleColorMode } = useThemeContext();

  return (
    <AppBar
      sx={{ bgcolor: "background.default", color: "text.primary" }}
      elevation={0}
      position="sticky"
    >
      <Toolbar>
        <Tooltip title="Source code" enterDelay={300}>
          <IconButton
            component="a"
            size="small"
            color="inherit"
            href="https://github.com/glitchboyl/chatgpt-demo"
            target="_blank"
            rel="noopener"
            sx={{
              mr: 1,
              border: (theme) => `1px solid ${theme.borderColor}`,
              borderRadius: 2,
            }}
          >
            <GitHubIcon />
          </IconButton>
        </Tooltip>
        <KeyPopper />
        <IconButton
          edge="start"
          size="small"
          color="inherit"
          aria-label="color mode"
          onClick={toggleColorMode}
          sx={{
            border: (theme) => `1px solid ${theme.borderColor}`,
            borderRadius: 2,
          }}
        >
          {theme.palette.mode === "light" ? (
            <LightModeIcon />
          ) : (
            <DarkModeIcon />
          )}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
