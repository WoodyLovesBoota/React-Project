import { useRecoilValue } from "recoil";
import CreateToDo from "./CreateToDo";
import { toDostate } from "../atoms";
import ToDo from "./ToDo";

const TodoList = () => {
  const toDos = useRecoilValue(toDostate);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo></CreateToDo>
      <ul>
        {toDos.map((todo) => (
          <ToDo key={todo.id} {...todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
