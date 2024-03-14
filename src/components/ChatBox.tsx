import { Box } from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { sendMessagesToGPT, type MessageModel } from "../api/chat";
import InputBox from "./InputBox";
import MessageBlock from "./MessageBlock";

const ChatBox = () => {
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      content:
        "Hello, I am Magento Refactor Assistant. Please type your code and I will help you refactor it.",
      role: "system",
      type: "info",
    },
  ]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = useCallback(
    (content: string) => {
      if (messages[messages.length - 1].type !== "typing") {
        const newMessages = [
          ...messages,
          {
            content,
            role: "user" as const,
            type: "info" as const,
          },
        ];
        setMessages([
          ...newMessages,
          {
            content: "",
            role: "assistant",
            type: "typing" as const,
          },
        ]);
        fetchMessages(newMessages);
      }
    },
    [messages]
  );

  const handleRegenerate = useCallback(() => {
    const newMessages = messages.slice(0, messages.length - 1);
    setMessages([
      ...newMessages,
      {
        content: "",
        role: "assistant",
        type: "typing" as const,
      },
    ]);
    fetchMessages(newMessages);
  }, [messages]);

  const fetchMessages = useCallback(
    async (newMessages: MessageModel[]) => {
      try {
        // const chatMessages = newMessages
        //   .filter((message) => message.type === "info")
        //   .map(({ role, content }) => ({ role, content }));

        const newMessage = newMessages[newMessages.length - 1];
        const completion = await sendMessagesToGPT(newMessage);
        console.log(completion);

        setMessages([
          ...newMessages,
          completion.hasOwnProperty("id")
            ? {
                content: completion.content[0]["text"].value,
                role: "assistant",
                type: "info",
              }
            : {
                content: completion.error.message,
                role: "assistant",
                type: "error",
              },
        ]);
      } catch (err: any) {
        setMessages([
          ...newMessages,
          {
            content: err.message,
            role: "assistant" as const,
            type: "error" as const,
          },
        ]);
      }
    },
    []
  );

  const handleFinishTyping = useCallback(
    (i: number) => {
      if (messages[i].type === "typing") {
        messages[i].type = "info" as const;
        setMessages([...messages]);
      }
    },
    [messages]
  );

  return (
    <>
      <Box
        width="100%"
        display="flex"
        justifyContent="center"
        sx={{ flexGrow: 1, overflow: "auto", position: "relative" }}
      >
        <Box
          width="100%"
          maxWidth="md"
          sx={{
            px: {
              xs: 2,
              sm: 6,
            },
          }}
          ref={chatBoxRef}
        >
          {messages.map((message, i) => (
            <MessageBlock
              model={message}
              onFinishTyping={() => handleFinishTyping(i)}
              key={i}
            />
          ))}
        </Box>
      </Box>
      <InputBox
        type={messages[messages.length - 1].type}
        onSendMessage={handleSendMessage}
        onRegenerate={handleRegenerate}
      />
    </>
  );
};

export default ChatBox;
