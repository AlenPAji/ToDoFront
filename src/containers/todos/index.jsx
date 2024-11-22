import { useContext, useState } from "react";
import { TodosContext } from "../../contexts/TodosContext";
import TodoFieldComponent from "../../components/todo-field";
import TodosComponent from "../../components/todos";
import TodoComponent from "../../components/todos/todo";
import TabsComponent from "../../components/tabs";

const TodosContainer = () => {
  const [open, setOpen] = useState(true);
  const { todos, createTodo, updateTodo, deleteTodo } = useContext(TodosContext);
  const [filter, setFilter] = useState("All");
  const [selectedTodos, setSelectedTodos] = useState([]); // New state to track selected todos

  const leftItems = todos.filter((todo) => !todo.done).length; // Count active todos

  const handleCreate = (title) => {
    createTodo(title);
  };

  const handleUpdate = (id, newTodo) => {
    updateTodo(id, newTodo);
  };

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleDeleteSelected = () => {
    selectedTodos.forEach((id) => handleDelete(id)); // Delete all selected todos
    setSelectedTodos([]); // Clear selection after deletion
  };

  const handleSelectTodo = (id) => {
    if (selectedTodos.includes(id)) {
      setSelectedTodos(selectedTodos.filter((todoId) => todoId !== id)); // Deselect todo
    } else {
      setSelectedTodos([...selectedTodos, id]); // Select todo
    }
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  // Filter todos based on the filter state
  const filteredTodos = todos.filter((todo) => {
    if (filter === "Active") return !todo.done;
    if (filter === "Done") return todo.done;
    return true; // Show all todos if filter is 'All'
  });

  return (
    <div className="md:max-w-3xl md:mx-auto">
      <div className="m-4 p-4 border border-gray-600">
        <TodoFieldComponent
          open={open}
          onToggle={() => setOpen(!open)}
          onCreate={handleCreate}
        />
        {open && (
          <>
            <TodosComponent>
              {filteredTodos.map((todo) => (
                <TodoComponent
                  key={todo._id}
                  id={todo._id}
                  title={todo.title}
                  done={todo.done}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                  onSelect={handleSelectTodo} // Pass the select handler
                  isSelected={selectedTodos.includes(todo._id)} // Check if todo is selected
                />
              ))}
            </TodosComponent>
            <div className="flex justify-between">
              <div className="border border-gray-600 p-2 flex items-center">
                <p>
                  {todos.length > 0 ? (
                    leftItems > 0 ? (
                      `${leftItems} left item${leftItems > 1 ? 's' : ''}`
                    ) : (
                      "All done!"
                    )
                  ) : (
                    <>Empty!</>
                  )}
                </p>
              </div>
            
              <div>
                <button
                  className="p-2 border border-gray-600"
                  onClick={handleDeleteSelected} // Delete selected todos
                  disabled={selectedTodos.length === 0} // Disable button if no todos selected
                >
                  Delete selected
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodosContainer;
