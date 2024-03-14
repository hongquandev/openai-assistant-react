import OpenAI from "openai/index.mjs";

let openai: any = null;
let assistant: any = null;
let thread: any = null;

export const initChatBot = async () => {
  openai = new OpenAI({
    apiKey: import.meta.env.VITE_REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  assistant = await openai.beta.assistants.retrieve(
    import.meta.env.VITE_REACT_APP_OPENAI_API_ASSISTANT_ID
  );
  thread = await openai.beta.threads.create();
};

initChatBot();

export type MessageModel = {
  content: string;
  role: "user" | "assistant" | "system";
  type: "info" | "error" | "typing";
};

export const sendMessagesToGPT = async (newMessages: MessageModel) => {
  try {
    // Send a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: newMessages.content,
    });

    // Run the assistant
    let run = await openai.beta.threads.runs.create(thread.id, {
      assistant_id: assistant.id,
    });

    while (["queued", "in_progress", "cancelling"].includes(run.status)) {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      run = await openai.beta.threads.runs.retrieve(run.thread_id, run.id);
    }

    if (run.status !== "completed") {
      console.log(run.status);
      throw new Error("Run failed");
    }

    // Get the messages for the thread
    const messageList = await openai.beta.threads.messages.list(thread.id);

    // Find the last message for the current run
    const lastMessage = messageList.data
      .filter(
        (message: any) =>
          message.run_id === run.id && message.role === "assistant"
      )
      .pop();

    if (lastMessage) {
      console.log(lastMessage.content[0]["text"].value);
    }

    return lastMessage;
  } catch (err: any) {
    throw new Error(err);
  }
};
