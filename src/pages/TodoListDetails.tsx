import { useTodo } from "../context/TodoContext";
import { useParams } from "react-router-dom";
import { Form } from "../components/Form";
import { TodoItem } from "../types";
import { useEffect, useState } from "react";
import { fetchListItems } from "../services/api";

const TodoListDetails = () => {
  const [tasks, setTasks] = useState<TodoItem[]>([]);
  const { todoLists, toggleTodoItem, addTodoItem, deleteTodoItem } = useTodo();
  const { id } = useParams<{ id: string }>();
  const list = todoLists.find((list) => list.id === id);

  useEffect(() => {
    if (id) {
      getTasks(id);
    }
  }, [id]);

  const addTodo = (todo: {
    title: string;
    description: string;
    deadline: string;
  }) => {
    if (!id) return;

    const newTodo: TodoItem = {
      id: crypto.randomUUID(),
      ...todo,
      isCompleted: false,
      listId: id,
    };

    setTasks((prevTasks) => [...prevTasks, newTodo]);
    addTodoItem(id, newTodo);
  };

  const getTasks = (listId: string) => {
    fetchListItems(listId)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  };

  if (!list) return <div>List not found</div>;

  return (
    <div className="p-1">
      <h1 className="text-xl font-bold mb-4">{list.name}</h1>
      <Form addTodo={addTodo} />
      <ul>
        {tasks.map((item: TodoItem) => (
          <li key={item.id} className="flex justify-between">
            <span className={item.isCompleted ? "line-through" : ""}>
              {item.title}
            </span>
            <button onClick={() => toggleTodoItem(list.id, item.id)}>
              Toggle
            </button>
            <button onClick={() => deleteTodoItem(list.id, item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoListDetails;
