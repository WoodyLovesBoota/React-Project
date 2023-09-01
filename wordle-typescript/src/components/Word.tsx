import { answerState } from "../atoms";
import { useRecoilValue } from "recoil";
import Letter from "./Letter";

const Word = () => {
  const answer = useRecoilValue(answerState);

  return (
    <form>
      <Letter bgColor="gray"></Letter>
      <Letter bgColor="gray"></Letter>
      <Letter bgColor="gray"></Letter>
      <Letter bgColor="gray"></Letter>
      <Letter bgColor="gray"></Letter>
      <button type="submit" style={{ display: "none" }} />
    </form>
  );
};

export default Word;
