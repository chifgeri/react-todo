import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

interface Props {}

const TodoList = (props: Props) => {
  const [todos, setTodos] = useState([
    {
      text: "asdasd",
      id: 1,
      place: 3,
      done: false,
    },
  ]);

  const sortTodos = (todoList: any) => {
    return todos.sort((a, b) => (a.place >= b.place ? 1 : 0));
  };

  const addTodo = (text: string) => {
    setTodos([...todos, { text, done: false, id: 2, place: 1 }]);
  };

  return (
    <div className="todo-list-container">
      <div className="list-name-span">
        <p className="list-name">Todo list</p>
      </div>
      {sortTodos(todos).map((item) => (
        <TodoItem text={item.text} />
      ))}
    </div>
  );
};

export default TodoList;
