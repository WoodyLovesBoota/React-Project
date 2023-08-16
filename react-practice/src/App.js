import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

const Hello = () => {
  useEffect(() => {
    console.log("Im here");
    return () => {
      console.log("destroy");
    };
  }, []);
  return <h1>Hello</h1>;
};

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => {
    setShowing((prev) => !prev);
  };
  return (
    <div>
      {showing ? <Hello></Hello> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
