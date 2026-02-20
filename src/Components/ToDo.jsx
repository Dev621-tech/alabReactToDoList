import { useState } from "react";

export default function ToDo() {
    // State for all todos
    const [todos, setTodos] = useState([]);
    // State for the new todo input
    const [newTodo, setNewTodo] = useState("");

    function handleAddTodo() {
        // Prevent empty todo
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

    function deleteTodo(id) {
        setTodos(todos.filter((todo) => todo.id !== id))
    }

    function enableEdit(id) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, isEditing: true } : todo
            )
        );
    }

    function handleEditChange(id, value) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: value } : todo
            )
        );
    }

    function saveEdit(id, newText) {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText, isEditing: false } : todo
            )
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
                            {todo.isEditing ? (
                                <>
                                    <input type="text" value={todo.text} onChange={(e) => handleEditChange(todo.id, e.target.value)} />
                                    <button onClick={() => saveEdit(todo.id, todo.text)}>Save</button>
                                </>
                            ) : (
                                <> <input type="checkbox" checked={todo.completed} onChange={() => toggleCompleted(todo.id)} />
                                    <span style={{ color: todo.completed ? "green" : "red" }}>{todo.text}  </span>
                                    <button onClick={() => enableEdit(todo.id)}>Edit</button>
                                    <button onClick={() => deleteTodo(todo.id)} disabled={!todo.completed}>Delete</button>


                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}