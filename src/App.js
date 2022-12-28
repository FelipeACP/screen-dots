import { useCallback, useEffect, useState } from "react";
import "./App.css";
import Dot from "./dot";

function App() {
  const [dots, setDots] = useState({});
  const [dotsKeys, setDotsKeys] = useState([]);
  const [commandMode, setCommandMode] = useState(false);

  useEffect(() => {
    const undo = () => {
      if (dotsKeys.length === 0) return;
      setDotsKeys(dotsKeys.slice(0, -1));
    };
    const redo = () => {
      if (dotsKeys.length + 1 > Object.values(dots).length) return;
      setDotsKeys([...dotsKeys, dotsKeys.length + 1]);
    };
    const keyPressActions = {
      "/": () => setCommandMode(true),
      Escape: () => setCommandMode(false),
      z: () => commandMode && undo(),
      y: () => commandMode && redo(),
    };
    const handleKeyDown = (ev) => keyPressActions[ev.key]?.();
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [commandMode, setDotsKeys, dotsKeys, dots]);

  const handleClick = useCallback(
    (event) => {
      setDots({
        ...dots,
        [dotsKeys.length + 1]: {
          clientX: event.clientX,
          clientY: event.clientY,
          key: dotsKeys.length + 1,
        },
      });
      setDotsKeys([...dotsKeys, dotsKeys.length + 1]);
    },
    [dotsKeys, dots]
  );

  return (
    <div className="App" onClick={handleClick}>
      {dotsKeys.map((key) => (
        <Dot key={key} axleX={dots[key].clientX} axleY={dots[key].clientY} />
      ))}
    </div>
  );
}

export default App;
