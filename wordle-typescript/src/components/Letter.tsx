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
  background-color: ${(props) => props.bgColor};
  &:focus {
    outline: none;
  }
`;

interface IColor {
  bgColor: string;
}

const Letter = ({ bgColor }: IColor) => {
  return <Input bgColor={bgColor}></Input>;
};

export default Letter;
