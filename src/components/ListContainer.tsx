import React, { useState } from "react";
import { TodoList as TList } from "../data/todolist.dto";
import ListSideBar from "./ListSideBar";
import TodoList from "./TodoList";
import "./ListContainer.css";
import { Todo } from "../data/todo.dto";

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

  const updateTodos = (item: TList, todos: Todo[]) => {
    setTodoLists([
      ...todoLists.filter((it) => item.id !== it.id),
      { ...item, todos },
    ]);
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
        {todoLists
          .sort((a, b) => (a.priority > b.priority ? 1 : 0))
          .map((item) => (
            <TodoList
              list={item}
              setTodos={(todos) => updateTodos(item, todos)}
            />
          ))}
      </div>
    </div>
  );
};

export default ListContainer;
