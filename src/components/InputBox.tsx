import { useState, useCallback, type FC } from "react";

import {
  Box,
  OutlinedInput,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { type MessageModel } from "../api/chat";

type InputBoxProps = {
  type: MessageModel["type"];
  onSendMessage: (message: string) => void;
  onRegenerate: () => void;
};

const InputBox: FC<InputBoxProps> = ({ type, onSendMessage, onRegenerate }) => {
  const [inputMessage, setInputMessage] = useState("");
  const handleSendMessage = useCallback(() => {
    if (type === "info" && inputMessage !== "") {
      setInputMessage("");
      onSendMessage(inputMessage);
    }
  }, [type, inputMessage]);
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="md"
      sx={{ px: 2, pb: 2 }}
    >
      {type === "error" ? (
        <>
          <Typography fontSize={12}>
            There was an error generating a response
          </Typography>
          <Button
            variant="contained"
            startIcon={<AutorenewIcon />}
            sx={{
              mt: 1,
              textTransform: "none",
              color: "#FFFFFF",
              background: "#10A37F",
              "&:hover": {
                background: "#1A7F64",
              },
            }}
            onClick={onRegenerate}
          >
            Regenerate
          </Button>
        </>
      ) : (
        <OutlinedInput
          value={inputMessage}
          autoFocus
          fullWidth
          placeholder="Message ChatGPT..."
          endAdornment={
            <IconButton
              edge="start"
              color="inherit"
              aria-label="settings"
              size="small"
              onClick={handleSendMessage}
              disabled={inputMessage === ""}
              sx={{
                color: "text.main",
                border: (theme) => `1px solid ${theme.borderColor}`,
                borderRadius: 2,
                background: (theme) => theme.activedBgColor,
                "&:hover": {
                  backgroundColor: (theme) => theme.activedBgColor,
                },
              }}
            >
              <ArrowUpwardIcon />
            </IconButton>
          }
          sx={{ borderRadius: 4 }}
          onChange={(event) => setInputMessage(event.target.value)}
          onKeyUp={({ key }) => {
            if (key === "Enter") {
              handleSendMessage();
            }
          }}
        />
      )}
    </Box>
  );
};

export default InputBox;
