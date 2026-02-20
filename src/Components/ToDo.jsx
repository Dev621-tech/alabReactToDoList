import { useState } from "react";

export default function ToDo() {
    // State for all todos
    const [todos, setTodos] = useState([]);
    // State for the new todo input
    const [newTodo, setNewTodo] = useState("");

    function handleAddTodo() {
        if (newTodo.trim() === "") return;

        const todoItem = {
            id: Date.now(),
            text: newTodo,
            completed: false,
            isEditing: false
        }

        // Add new todo to the top of list
        setTodos([todoItem, ...todos]);
        // Clears input
        setNewTodo("")
    }

    function toggleCompleted(id) {
        setTodos(
            todos.map((todo) =>
                // When the todo matches the ID, toggle its completed value
                todo.id === id ? { ...todo, completed: !todo.completed } : todo)
        );
    }


    return (
        <>
            <div>
                <h1>ToDo List</h1>
                <input
                    type="text"
                    placeholder="Add A New Todo ..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                />
                <br /><br />
                <button onClick={handleAddTodo}>Submit Todo</button>
                <br />
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.text} {todo.completed ? "Completed" : ""}
                            <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}