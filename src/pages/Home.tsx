import { useTodo } from "../context/TodoContext";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { todoLists, addTodoList, removeTodoList } = useTodo();
  const [listName, setListName] = useState("");

  return (
    <div className="flex flex-col py-5">
      <div className="flex flex-row justify-between items-center w-full p-4 rounded-md">
        {/* Title */}
        <h1 className="text-3xl font-bold">📝 ToDo Lists</h1>

        {/* Input and Button Container */}
        <div className="flex items-center space-x-2">
          <input
            value={listName}
            onChange={(e) => setListName(e.target.value)}
            placeholder="New list name"
            className="border p-2 rounded-md"
          />
          <button
            onClick={() => addTodoList(listName)}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {todoLists.map((list) => (
          <div
            key={list.id}
            className="w-80 border shadow-lg rounded-lg overflow-hidden"
          >
            <div className="p-4 bg-gray-100 font-bold text-lg">{list.name}</div>
            <div className="p-4">
              <p className="text-gray-700">Manage your tasks efficiently</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-teal-500 h-2.5 rounded-full"
                  style={{ width: "70%" }} // Set the width dynamically based on your progress (e.g., task completion)
                ></div>
              </div>

              {/* Progress Percentage */}
              <div className="flex justify-between text-sm text-teal-600">
                <span>0%</span>
                <span>70%</span>{" "}
                {/* Change this value based on your progress */}
              </div>
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
      </div>
    </div>
  );
};

export default Home;
