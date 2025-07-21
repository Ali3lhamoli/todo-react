import { createContext, useState, useContext } from "react";

const SnakeContext = createContext({});

export const SnakeProvider = ({ children }) => {
  const [openSnake, setOpenSnake] = useState(false);

  const [snakeContent, setSnakeContent] = useState(false);

  return (
    <SnakeContext.Provider
      value={{ openSnake, setOpenSnake, snakeContent, setSnakeContent }}
    >
      {children}
    </SnakeContext.Provider>
  );
};

export const useSnake = () => {
  return useContext(SnakeContext);
};
