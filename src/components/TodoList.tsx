// import { useState } from "react";
// import { FilterOptions, TodoItem } from "../types";

// const TodoList = ({ todos }: { todos: TodoItem[] }) => {
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   const [filter, setFilter] = useState<string>(FilterOptions.ALL);

//   const filteredTodos = todos
//     .filter((todo) => {
//       if (filter === FilterOptions.ACTIVE) return !todo.isCompleted;
//       if (filter === FilterOptions.COMPLETED) return todo.isCompleted;
//       return true;
//     })
//     .filter(
//       (todo) =>
//         todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         todo.description.toLowerCase().includes(searchTerm.toLowerCase()),
//     );

//   return (
//     <div>
//       {/* Search Input */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search by title or description..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="border px-4 py-2 rounded w-full"
//         />
//       </div>

//       {/* Filter Buttons */}
//       <div className="flex gap-2 mb-4">
//         {Object.values(FilterOptions).map((f) => (
//           <button
//             key={f}
//             onClick={() => setFilter(f)}
//             className={`px-4 py-2 rounded ${filter === f ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           >
//             {f.charAt(0).toUpperCase() + f.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Display Filtered ToDos */}
//       <ul>
//         {filteredTodos.map((todo) => (
//           <li key={todo.id} className="mb-2">
//             <h2
//               className={`text-lg font-bold ${todo.isCompleted ? "line-through" : ""}`}
//             >
//               {todo.title}
//             </h2>
//             <p>{todo.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TodoList;
