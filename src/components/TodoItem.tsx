import React, { useState } from "react";
import "./TodoItem.css";
import { Todo } from "../data/todo.dto";

interface Props {
  onUpPress: () => void;
  onDownPress: () => void;
  todo: Todo;
  last: boolean;
  updateTodo: (todo: Todo) => void;
  remove: (todo: Todo) => void;
  otherLists: { id: number; name: string }[];
  moveBetweenLists: (place: number) => void;
}

const TodoItem = (props: Props) => {
  const [moveClicked, setMoveClicked] = useState<boolean>(false);
  return (
    <div className="todo-container">
      <input
        type="checkbox"
        value={props.todo.done ? 1 : 0}
        onChange={() => {
          props.updateTodo({
            ...props.todo,
            done: !props.todo.done,
          });
        }}
      />
      {props.todo.text}
      <div className="control-buttons">
        {moveClicked ? (
          <select
            placeholder="Other list"
            defaultValue=""
            onChange={(e: any) => {
              if (e.target.value >= 0) {
                props.moveBetweenLists(e.target.value);
              }
              setMoveClicked(false);
            }}
          >
            <option key={0} value={0}>
              None
            </option>
            {props.otherLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>
        ) : (
          <div>
            {props.otherLists.length > 0 && (
              <input
                type="button"
                onClick={() => setMoveClicked(true)}
                value="Move to..."
              />
            )}
          </div>
        )}
        <input
          type="button"
          onClick={() => {
            props.onUpPress();
          }}
          disabled={props.todo.done || props.todo.place <= 1}
          value="Up"
        />
        <input
          type="button"
          onClick={() => {
            props.onDownPress();
          }}
          disabled={props.todo.done || props.last}
          value="Down"
        />
        <input
          type="button"
          onClick={() => {
            props.remove(props.todo);
          }}
          value="Remove"
        />
      </div>
    </div>
  );
};

export default TodoItem;
