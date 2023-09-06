import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import { useForm } from "react-hook-form";

const Container = styled.div`
  margin: 80px 120px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Form = styled.form`
  width: 18.9375rem;
  height: 3.25rem;
  border-radius: 0.75rem;
  background-color: white;
  box-shadow: 0 5px 5px 3px rgba(0, 0, 0, 0.2);
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.625rem 0 1.25rem;
  margin-bottom: 40px;
  input {
    width: 200px;
    height: 52px;
    border: none;
    border-radius: 0.75rem;
    font-size: 18px;
    &::placeholder {
      color: rgba(0, 0, 0, 0.3);
    }
    &:focus {
      outline: none;
    }
  }
`;

const Button = styled.button.attrs({ type: "submit" })`
  font-size: 36px;
  font-weight: 530;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.cardColor};
  color: ${(props) => props.theme.accentColor};
`;

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
          placeholder="Add a new board"
        />
        <Button>+</Button>
      </Form>
      <Wrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Boards>
            {Object.keys(toDos).map((boardId) => (
              <Board toDos={toDos[boardId]} boardId={boardId} key={boardId} />
            ))}
          </Boards>
        </DragDropContext>
      </Wrapper>
    </Container>
  );
}

export default App;
