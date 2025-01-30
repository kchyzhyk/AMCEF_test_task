import { useTodo } from "../context/TodoContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { todoLists, addTodoList, removeTodoList } = useTodo();
  const [listName, setListName] = useState("");

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold">ToDo Lists</h1>

      <div className="w-full max-w-md">
        <input
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="New list name"
          className="border p-2 w-full rounded-md mb-4"
        />
        <button
          onClick={() => addTodoList(listName)}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Add List
        </button>
      </div>

      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {todoLists.map((list) => (
          <div
            key={list.id}
            className="w-80 border shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4 bg-gray-100 font-bold text-lg">{list.name}</div>
            <div className="p-4">
              <p className="text-gray-700">Manage your tasks efficiently</p>
            </div>
            <div className="p-4 flex justify-between bg-gray-50">
              <Link
                to={`/lists/${list.id}`}
                className="text-blue-500 hover:underline"
              >
                View List
              </Link>
              <button
                onClick={() => removeTodoList(list.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Home;
