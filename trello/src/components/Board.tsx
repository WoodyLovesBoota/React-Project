import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import { styled } from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div<IWrapper>`
  padding-top: 1vw;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 1vw;
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  position: ${(props) => props.boardId === "TrashLILI" && "fixed"};
  top: ${(props) => props.boardId === "TrashLILI" && 0};
  right: ${(props) => props.boardId === "TrashLILI" && 0};
  background-color: ${(props) => props.boardId === "TrashLILI" && "transparent"};
  * :not(Area) {
    display: ${(props) => props.boardId === "TrashLILI" && "none"};
  }

  width: ${(props) => props.boardId === "TrashLILI" && "15vw"};
  min-height: ${(props) => props.boardId === "TrashLILI" && "10vw"};
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 1.5vw;
`;

const Area = styled.div<IDragging>`
  background-color: ${(props) =>
    props.isDraggingOver ? "#fad388" : props.isDraggingFromThis ? "transparent" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.5s ease-in-out;
  padding: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 90%;
    border: none;
    border-bottom: 2px solid black;
    background-color: transparent;
    font-size: 1.2vw;
    margin-top: 1vw;
    padding: 3px 0;
    &:focus {
      outline: none;
      border-color: #00b894;
    }
    transition: border-color 0.3s ease-in-out;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2vw;
  margin-top: 0.5vw;
`;

const Button = styled.button``;

interface IBoardProps {
  toDos: ITodo[];
  boardId: string;
}

interface IDragging {
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

interface IForm {
  toDo: string;
}

interface IWrapper {
  boardId: string;
}

const Board = ({ toDos, boardId }: IBoardProps) => {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newToDo = {
      id: Date.now(),
      text: toDo,
    };
    setToDos((current) => {
      return { ...current, [boardId]: [...current[boardId], newToDo] };
    });
    setValue("toDo", "");
  };

  const deleteBoard = () => {
    setToDos((current) => {
      let copyBoard = { ...current };
      delete copyBoard[boardId];
      return copyBoard;
    });
  };

  return (
    <Wrapper boardId={boardId}>
      <Header>
        <Title>{boardId}</Title>
        <Button onClick={deleteBoard}>X</Button>
      </Header>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add task on ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Area
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {toDos.map((toDo, index) => (
              <DragabbleCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
            ))}
            {provided.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
};

export default Board;
