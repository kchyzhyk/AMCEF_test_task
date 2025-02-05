import EditListModal from "../components/EditListModal";
import TodoListComponent from "../components/TodoListComponent";
import { useTodo } from "../context/TodoContext";
import { useState } from "react";
import { TodoList } from "../types";

const Home = () => {
  const { todoLists, addTodoList, removeTodoList, editTodoList } = useTodo();
  const [listName, setListName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState<TodoList>();

  const openModal = (list: TodoList) => {
    setSelectedList(list);
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = (updatedName: string) => {
    if (selectedList) {
      editTodoList(selectedList.id, updatedName);
      setIsModalOpen(false);
    }
  };

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
            onClick={() => {
              if (!listName) return;
              addTodoList(listName);
              setListName("");
            }}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Add List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {todoLists.map((list) => {
          return (
            <TodoListComponent
              key={list.id}
              list={list}
              openModal={openModal}
              removeTodoList={removeTodoList}
            />
          );
        })}
      </div>

      <EditListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        listName={selectedList?.name || ""}
      />
    </div>
  );
};

export default Home;
