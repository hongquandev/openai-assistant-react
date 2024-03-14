import {
  useState,
  useMemo,
  useCallback,
  createContext,
  useContext,
  type FC,
  type PropsWithChildren,
} from "react";

const STORAGE_KEY_ID = "chatgpt-demo-api-key";

export const ApiKeyContext = createContext<
  readonly [string, (key: string) => void]
>(["", () => {}]);
export const useApiKey = () => useContext(ApiKeyContext);

export const ApiKeyContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [key, setKey] = useState(localStorage.getItem(STORAGE_KEY_ID) || "");
  const changeKey = useCallback((newKey: string) => {
    setKey(newKey);
    localStorage.setItem(STORAGE_KEY_ID, newKey);
  }, []);
  const provider = useMemo(() => [key, changeKey] as const, [key]);
  return (
    <ApiKeyContext.Provider value={provider}>{children}</ApiKeyContext.Provider>
  );
};
