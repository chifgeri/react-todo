import React, { useState, useEffect } from "react";
import { TodoList as TList } from "../data/todolist.dto";
import ListSideBar from "./ListSideBar";
import TodoList from "./TodoList";
import "./ListContainer.css";
import { Todo } from "../data/todo.dto";
import {
  postNewTodoList,
  getAllTodoList,
  putTodoList,
} from "../network/todoQueries";

interface Props {}

const ListContainer = (props: Props) => {
  const [todoLists, setTodoLists] = useState<TList[]>([]);
  const [maxPriority, setMaxPriority] = useState<number>(todoLists.length);

  useEffect(() => {
    getAllTodoList()
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((json) => {
        setTodoLists(json.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setMaxPriority(todoLists.length + 1);
  }, [todoLists]);

  const addTodoList = (name: string) => {
    const newList = {
      name,
      todos: [],
      id: Math.round(Math.random() * 10000),
      priority: maxPriority,
      maxPlace: 1,
    };

    setTodoLists([...todoLists, newList]);
    postNewTodoList(newList);
  };

  const updateTodoList = (list: TList) => {
    setTodoLists([...todoLists.filter((it) => list.id !== it.id), list]);
    putTodoList(list);
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
        item.priority++;
        setTodoLists([...list, item]);
        putTodoList(downItem);
        putTodoList(item);
      }
    }

    if (direction === "up") {
      // Find the todo over the item
      let upperItem = list.find((it) => it.priority === item.priority - 1);
      // When found switch the place value
      if (upperItem) {
        upperItem.priority = item.priority;
        item.priority--;
        putTodoList(upperItem);
        putTodoList(item);
        setTodoLists([...list, item]);
      }
    }
  };

  const moveBetweenLists = (todo: Todo, listID: number) => {
    // Find target list
    const tList = todoLists.find((it) => {
      return it.id === Number(listID);
    });
    //Remove todo from the source list
    const sList = todoLists.find((item) => item.todos.includes(todo));
    if (sList && tList) {
      //Remove todo from the source list
      sList.todos = sList.todos.filter((item) => item.id !== todo.id);
      if (todo.place > 0) {
        sList.maxPlace = sList.maxPlace + 1;
      }
      // Add todo to target list and increment maxPlace
      tList.todos.push({ ...todo, place: tList.maxPlace });
      tList.maxPlace++;
      // Set new state
      setTodoLists([
        ...todoLists.filter(
          (item) => item.id !== sList.id && item.id !== tList.id
        ),
        sList,
        tList,
      ]);
      // Send them to server (or save to db if no internet)
      putTodoList(sList);
      putTodoList(tList);
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
          .sort((a, b) => (a.priority > b.priority ? 1 : -1))
          .map((item) => (
            <TodoList
              key={item.id}
              list={item}
              setTodos={(list) => updateTodoList(list)}
              moveBetweenLists={(todo, listId) =>
                moveBetweenLists(todo, listId)
              }
              otherLists={todoLists
                .filter((it) => it.id !== item.id)
                .map((list) => ({ id: list.id, name: list.name }))}
            />
          ))}
      </div>
    </div>
  );
};

export default ListContainer;
