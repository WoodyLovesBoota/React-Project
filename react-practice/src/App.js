import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyWord, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => {
    setKeyword(event.target.value);
  };
  console.log("I run all the time");
  const iRunOnlyOnce = () => {
    console.log("only once");
  };

  useEffect(iRunOnlyOnce, []);
  useEffect(() => {
    console.log("search", keyWord);
  }, [keyWord, counter]);

  return (
    <div>
      <input type="text" placeholder="Search here..." onChange={onChange} value={keyWord} />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

export default App;
