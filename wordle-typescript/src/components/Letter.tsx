import { styled } from "styled-components";

const Input = styled.input.attrs({
  maxLength: 1,
  required: true,
})<IColor>`
  width: 6vw;
  height: 6vw;
  border-radius: 1vw;
  margin: 0.4vw 0.2vw;
  border: none;
  text-align: center;
  vertical-align: center;
  font-size: 5vw;
  color: white;
  text-transform: uppercase;
  transition: background-color 1s ease-in-out;
  caret-color: transparent;
  background-color: ${(props) => props.bgcolor};
  &:focus {
    outline: none;
  }
`;

interface IColor {
  bgcolor: string;
}

const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // console.log(event.currentTarget.value);
};

const moveCursor = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Backspace") {
    (e.currentTarget.previousSibling as HTMLElement)?.focus();
  } else if (e.currentTarget.value.length === 1) {
    (e.currentTarget.nextSibling as HTMLElement)?.focus();
  }
};

const Letter = ({ bgcolor }: IColor) => {
  return <Input bgcolor={bgcolor} onKeyUp={moveCursor} onChange={onChange}></Input>;
};

export default Letter;
