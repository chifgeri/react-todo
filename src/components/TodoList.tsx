import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";
import AddTodo from "./AddTodo";
import { Todo } from "../data/todo.dto";
import { TodoList as TList } from "../data/todolist.dto";

interface Props {
  list: TList;
  setTodos: (todos: Todo[]) => void;
}

const TodoList = (props: Props) => {
  const { todos, name } = props.list;
  const setTodos = props.setTodos;
  const [maxPlace, setMaxPlace] = useState<number>(1);

  const sortTodos = (todoList: any) => {
    return todos.sort((a, b) => (a.place >= b.place ? 1 : 0));
  };

  const addTodo = (text: string) => {
    setTodos([
      ...todos,
      {
        text,
        done: false,
        id: Math.round(Math.random() * 100000),
        place: maxPlace,
      },
    ]);
    setMaxPlace(maxPlace + 1);
  };

  const moveTodo = (item: any, direction: string) => {
    // get todos without this item
    let list = todos.filter((it) => it.id !== item.id);
    if (direction === "down") {
      // Find the todo under the item
      let downItem = list.find((it) => it.place === item.place + 1);
      // When found switch the place value
      if (downItem) {
        downItem.place = item.place;
        setTodos([...list, { ...item, place: item.place + 1 }]);
      }
    }

    if (direction === "up") {
      // Find the todo over the item
      let upperItem = list.find((it) => it.place === item.place - 1);
      // When found switch the place value
      if (upperItem) {
        upperItem.place = item.place;
        setTodos([...list, { ...item, place: item.place - 1 }]);
      }
    }
  };

  const updateTodo = (todo: Todo) => {
    const oldVal = todos.find((it) => it.id === todo.id);
    let list = todos;
    if (todo.done) {
      // When the place changes to -1 we should update the following todo's places
      if (oldVal) {
        list = list.map((item) => {
          if (item.place > oldVal.place) {
            item.place--;
          }
          return item;
        });
      }
      todo.place = -1;
      setMaxPlace(maxPlace - 1);
    } else {
      // When changed done to false, place it to the end of the list
      todo.place = maxPlace;
      setMaxPlace(maxPlace + 1);
    }
    setTodos([...list.filter((item) => item.id !== todo.id), todo]);
  };

  const removeTodo = (todo: Todo) => {
    setTodos([
      ...todos
        .filter((it) => it.id !== todo.id)
        .map((item) => {
          if (todo.place >= 1 && item.place > todo.place) {
            item.place--;
          }
          console.log(item.place);
          return item;
        }),
    ]);
    if (todo.place >= 1) setMaxPlace(maxPlace - 1);
  };

  return (
    <div className="todo-list-container">
      <div className="list-name-span">
        <p className="list-name">{name}</p>
      </div>
      {sortTodos(todos).map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          onUpPress={() => {
            moveTodo(item, "up");
          }}
          onDownPress={() => {
            moveTodo(item, "down");
          }}
          last={item.place === todos.filter((t) => t.done === false).length}
          updateTodo={updateTodo}
          remove={removeTodo}
        />
      ))}
      <AddTodo onAdd={addTodo} />
    </div>
  );
};

export default TodoList;
