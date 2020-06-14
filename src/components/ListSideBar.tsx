import React, { useState } from "react";
import { TodoList } from "../data/todolist.dto";
import "./ListSideBar.css";

interface Props {
  list: TodoList[];
  addNewList: (name: string) => void;
  moveList: (item: TodoList, direction: string) => void;
}

const ListSideBar = (props: Props) => {
  const [hoverItem, setHoverItem] = useState<number | null>();
  const [showInput, setShowInput] = useState<boolean>(false);
  const [newListName, setNewListName] = useState<string>("");

  return (
    <div className="side-bar-container">
      {props.list.map((item) => (
        <div
          className="side-bar-item"
          onMouseEnter={() => {
            setHoverItem(item.id);
          }}
          onMouseLeave={() => {
            setHoverItem(null);
          }}
        >
          <p>{item.name}</p>
          {item.id === hoverItem && (
            <div>
              {item.priority > 1 && (
                <input
                  type="button"
                  onClick={() => {
                    props.moveList(item, "up");
                  }}
                  value="Up"
                />
              )}
              {item.priority < props.list.length && (
                <input
                  type="button"
                  onClick={() => {
                    props.moveList(item, "down");
                  }}
                  value="Down"
                />
              )}
            </div>
          )}
        </div>
      ))}
      {showInput ? (
        <div className="side-bar-item">
          <input
            type="text"
            value={newListName}
            placeholder="List Name"
            onChange={(e) => {
              setNewListName(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (newListName.length > 0) {
                props.addNewList(newListName);
                setNewListName("");
              }
              setShowInput(false);
            }}
          >
            Add Item
          </button>
        </div>
      ) : (
        <div
          className="side-bar-item"
          onClick={() => {
            setShowInput(true);
          }}
        >
          <p>+ Add New List</p>
        </div>
      )}
    </div>
  );
};

export default ListSideBar;
