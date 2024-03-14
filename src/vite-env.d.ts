/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_OPENAI_API_KEY: string;
  readonly VITE_REACT_APP_OPENAI_API_ASSISTANT_ID: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
