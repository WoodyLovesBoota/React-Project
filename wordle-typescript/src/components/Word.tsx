import { answerState, STATUS, isFinishState } from "../atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Letter from "./Letter";
import { useState } from "react";

const Word = () => {
  const answer = useRecoilValue(answerState);
  const [colors, setColors] = useState(["", "", "", "", ""]);
  const setIsFinished = useSetRecoilState(isFinishState);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    checkIsAnswer(event);
  };

  const checkIsAnswer = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let checkArr = [];
    let res = [];
    let green = 0;
    for (let i = 0; i < 5; i++) {
      res.push((event.currentTarget[i] as HTMLInputElement).value);
      if (res[i] === answer[i]) {
        green++;
        checkArr[i] = "G";
      } else if (answer.includes(res[i])) {
        checkArr[i] = "Y";
      } else {
        checkArr[i] = "B";
      }
    }
    setColors(checkArr);
    green === 5 && setIsFinished(STATUS.WIN);
    if (event.currentTarget.nextSibling !== null)
      (event.currentTarget.nextSibling.firstChild as HTMLElement)?.focus();
    else {
      green !== 5 && setIsFinished(STATUS.LOSE);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {colors.map((color, index) => (
        <Letter
          key={index}
          bgcolor={
            color === "G"
              ? "#539165"
              : color === "Y"
              ? "#F7C04A"
              : color === "B"
              ? "gray"
              : "#dcdde1"
          }
        />
      ))}
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
};

export default Word;
