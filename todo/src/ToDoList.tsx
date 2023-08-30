import { useState } from "react";
import { useForm } from "react-hook-form";

// const TodoList = () => {
//   const [todo, setTodo] = useState("");
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setTodo(value);
//   };

//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={todo} placeholder="Write a to do" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

const ToDoList = () => {
  const { register, watch, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("email", { required: true })} placeholder="Write a Email" />
        <input {...register("name", { required: true })} placeholder="Write a Name" />
        <input
          {...register("username", { required: true, minLength: 10 })}
          placeholder="Write a Username"
        />
        <input
          {...register("password", { required: "Password Is Required" })}
          placeholder="Write a Password"
        />
        <button>Add</button>
      </form>
    </div>
  );
};

export default ToDoList;
