import { useRecoilValue, useRecoilState } from "recoil";
import CreateToDo from "./CreateToDo";
import { categoryState, toDoSelector, toDostate, Categories } from "../atoms";
import ToDo from "./ToDo";

const TodoList = () => {
  const toDos = useRecoilValue(toDostate);
  const todos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        <option value={Categories.TODO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </select>
      <CreateToDo />
      {todos?.map((todo) => (
        <ToDo key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
