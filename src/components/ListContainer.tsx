import React, { useState } from "react";
import { TodoList as TList } from "../data/todolist.dto";
import ListSideBar from "./ListSideBar";
import TodoList from "./TodoList";
import "./ListContainer.css";

interface Props {}

const ListContainer = (props: Props) => {
  const [todoLists, setTodoLists] = useState<TList[]>([
    { name: "faefsf", todos: [], id: 1 },
    { name: "q3rqwfaíf", todos: [], id: 2 },
    { name: "ewegqw3t", todos: [], id: 3 },
  ]);
  return (
    <div className="list-container">
      <ListSideBar list={todoLists} />
      <div className="todo-lists">
        <TodoList />
      </div>
    </div>
  );
};

export default ListContainer;
