import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { historyState } from "../atoms";

const Container = styled.div`
  max-width: 900px;
  margin: 0;
  padding: 5vh 0;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50vw;
  margin-bottom: 0.5vw;
`;

const Cell = styled.div<IColor>`
  border: none;
  background-color: ${(props) => props.bgcolor};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.5vw;
  height: 4.5vw;
  border-radius: 0.5vw;
  font-size: 1.5vw;
  color: #12121b;
  font-weight: 600;
  cursor: pointer;
`;

interface IColor {
  bgcolor: string;
}

const Keyboard = () => {
  const history = useRecoilValue(historyState);
  const firstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const secondRow = ["A", "S", "D", "F", "G", "H", "I", "J", "K", "L"];
  const thirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  const historySet = Array.from(new Set(history).values());

  return (
    <Container>
      <Row>
        {firstRow.map((element) => (
          <Cell
            key={element}
            bgcolor={historySet.includes(element.toLowerCase()) ? "gray" : "#c4cbdd"}
          >
            {element}
          </Cell>
        ))}
      </Row>
      <Row>
        {secondRow.map((element) => (
          <Cell
            key={element}
            bgcolor={historySet.includes(element.toLowerCase()) ? "gray" : "#c4cbdd"}
          >
            {element}
          </Cell>
        ))}
      </Row>
      <Row>
        <Cell bgcolor={"#c4cbdd"} style={{ width: "7vw" }}>
          backspace
        </Cell>
        {thirdRow.map((element) => (
          <Cell
            key={element}
            bgcolor={historySet.includes(element.toLowerCase()) ? "gray" : "#c4cbdd"}
          >
            {element}
          </Cell>
        ))}
        <Cell bgcolor={"#c4cbdd"} style={{ width: "7vw" }}>
          Enter
        </Cell>
      </Row>
    </Container>
  );
};

export default Keyboard;
