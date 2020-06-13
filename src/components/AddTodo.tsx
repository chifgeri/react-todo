import React, { useState } from "react";
import "./TodoItem.css";

interface Props {
  onAdd: (text: string) => void;
}

const AddTodo = (props: Props) => {
  const [text, setText] = useState<string>("");
  return (
    <div className="todo-container">
      <input type="checkbox" disabled />
      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <input
        type="button"
        onClick={() => {
          if (text.length > 0) {
            props.onAdd(text);
            setText("");
          }
        }}
        value="Add Todo"
      />
    </div>
  );
};

export default AddTodo;
