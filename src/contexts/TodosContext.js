import React, { useEffect, useState } from "react";
import axios from "axios";

const TodosContext = React.createContext({
  todos: [{ id: "", title: "", done: false }],
  createTodo: (title) => {},
  updateTodo: (id, newTodo) => {},
  deleteTodo: (id) => {},
});

const TodosContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  // Fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get("https://todog-production-af47.up.railway.app/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Create a new todo
  const createTodo = async (title) => {
    try {
      const response = await axios.post("https://todog-production-af47.up.railway.app/todos", { title });
      setTodos((currentTodos) => [...currentTodos, response.data]);
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  // Update a todo
  const updateTodo = async (id, newTodo) => {
    
    try {
      console.log(id)
      const response = await axios.put(`https://todog-production-af47.up.railway.app/todos/${id}`, newTodo);
      setTodos((currentTodos) =>
        currentTodos.map((todo) => (todo._id === id ? response.data : todo))
      );
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todog-production-af47.up.railway.app/todos/${id}`);
      setTodos((currentTodos) => currentTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider
      value={{ todos, createTodo, updateTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContextProvider;
export { TodosContext };
