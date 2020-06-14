import React, { useState } from "react";
import { TodoList as TList } from "../data/todolist.dto";
import ListSideBar from "./ListSideBar";
import TodoList from "./TodoList";
import "./ListContainer.css";

interface Props {}

const ListContainer = (props: Props) => {
  const [todoLists, setTodoLists] = useState<TList[]>([]);
  const [maxPriority, setMaxPriority] = useState<number>(1);

  const addTodoList = (name: string) => {
    setTodoLists([
      ...todoLists,
      {
        name,
        todos: [],
        id: Math.round(Math.random() * 10000),
        priority: maxPriority,
      },
    ]);
    setMaxPriority(maxPriority + 1);
  };

  return (
    <div className="list-container">
      <ListSideBar
        list={todoLists}
        addNewList={(n) => {
          addTodoList(n);
        }}
      />
      <div className="todo-lists">
        <TodoList />
      </div>
    </div>
  );
};

export default ListContainer;
