import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import { useForm } from "react-hook-form";

const Container = styled.div`
  margin: 5vw;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10vh auto;
`;

const Boards = styled.div`
  width: 90vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
`;

const Form = styled.form``;

interface IBoardForm {
  board: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IBoardForm>();

  const onDragEnd = (info: DropResult) => {
    const { destination, source } = info;
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
        destination.droppableId !== "TrashLILI" &&
          targetBoard.splice(destination?.index, 0, taskObj);
        return {
          ...oldBoards,
          [source.droppableId]: copyBoard,
          [destination.droppableId]: targetBoard,
        };
      });
    }
  };

  const onValid = ({ board }: IBoardForm) => {
    setToDos((current) => {
      return { ...current, [board]: [] };
    });
    setValue("board", "");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("board", { required: true })}
          type="text"
          placeholder="Add Board"
        ></input>
      </Form>
      <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
        </Wrapper>
      </DragDropContext>
    </Container>
  );
}

export default App;
