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

  const moveTodoList = (item: TList, direction: string) => {
    // get todos without this item
    let list = todoLists.filter((it) => it.id !== item.id);
    if (direction === "down") {
      // Find the todo under the item
      let downItem = list.find((it) => it.priority === item.priority + 1);
      // When found switch the place value
      if (downItem) {
        downItem.priority = item.priority;
        setTodoLists([...list, { ...item, priority: item.priority + 1 }]);
      }
    }

    if (direction === "up") {
      // Find the todo over the item
      let upperItem = list.find((it) => it.priority === item.priority - 1);
      // When found switch the place value
      if (upperItem) {
        upperItem.priority = item.priority;
        setTodoLists([...list, { ...item, priority: item.priority - 1 }]);
      }
    }
  };

  return (
    <div className="list-container">
      <ListSideBar
        list={todoLists}
        addNewList={(n) => {
          addTodoList(n);
        }}
        moveList={(item, direction) => {
          moveTodoList(item, direction);
        }}
      />
      <div className="todo-lists">
        {todoLists
          .sort((a, b) => (a.priority > b.priority ? 1 : 0))
          .map((item) => (
            <TodoList
              key={item.id}
              list={item}
              setTodos={(todos) => updateTodos(item, todos)}
            />
          ))}
      </div>
    </div>
  );
};

export default ListContainer;
