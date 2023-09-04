import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./components/DragabbleCard";
import Board from "./components/Board";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onDragEnd = (info: DropResult) => {
    const { destination, source, draggableId } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      setToDos((oldBoards) => {
        const copyBoard = [...oldBoards[source.droppableId]];
        const taskObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        copyBoard.splice(destination?.index, 0, taskObj);
        return {
          ...oldBoards,
          [source.droppableId]: copyBoard,
        };
      });
    } else {
      setToDos((oldBoards) => {
        const copyBoard = [...oldBoards[source.droppableId]];
        const targetBoard = [...oldBoards[destination.droppableId]];
        const taskObj = copyBoard[source.index];
        copyBoard.splice(source.index, 1);
        targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...oldBoards,
          [source.droppableId]: copyBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
