import { useState, useRef, useCallback } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  Popper,
  Paper,
  IconButton,
  ClickAwayListener,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useApiKey } from "../api/key";

const KeyPopper = () => {
  const [apiKey, setApiKey] = useApiKey();
  const anchorButtonRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => {
    setShowApiKey(false);
    setOpen(false);
  }, []);
  const toggleShowKey = useCallback(
    () => setShowApiKey((show) => !show),
    [showApiKey]
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Box
      sx={{
        flexGrow: 1,
        textAlign: {
          xs: "center",
          sm: "left",
        },
      }}
    >
      <Button
        aria-describedby="key-popper"
        ref={anchorButtonRef}
        onClick={handleOpen}
        sx={{
          color: "text.primary",
          textTransform: "none",
        }}
      >
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: 18,
          }}
        >
          ChatGPT demo
        </Typography>
        <KeyboardArrowDownIcon
          fontSize="small"
          sx={{ color: "text.secondary" }}
        />
      </Button>
      <Popper
        id="key-popper"
        open={open}
        anchorEl={anchorButtonRef.current}
        placement={matches ? "bottom-start" : "bottom"}
        sx={{ zIndex: 1200 }}
      >
        <Paper elevation={3} sx={{ p: 2 }}>
          <ClickAwayListener onClickAway={handleClose}>
            <TextField
              type={showApiKey ? "text" : "password"}
              label="API Key"
              placeholder="Please input your OpenAI API key"
              autoFocus
              size="small"
              sx={{ width: 320 }}
              value={apiKey}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowKey}
                      onMouseDown={(event) => event.preventDefault()}
                      edge="end"
                      size="small"
                      sx={{
                        border: "none",
                      }}
                    >
                      {showApiKey ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setApiKey(e.target.value)}
            />
          </ClickAwayListener>
        </Paper>
      </Popper>
    </Box>
  );
};

export default KeyPopper;
