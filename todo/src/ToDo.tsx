import { useState } from "react";
import { useForm } from "react-hook-form";

interface IForm {
  todo: string;
}

const TodoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = (data: IForm) => {
    console.log("add todo", data.todo);
    setValue("todo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("todo", {
            required: "Please wirte a to do",
          })}
          placeholder="Write a to do"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default TodoList;
