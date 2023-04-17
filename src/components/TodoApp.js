import React, { useState, useEffect } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== '') {
      const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;
      const newTodoObj = {
        id: newId,
        text: newTodo.trim(),
        completed: false,
        dueDate: null,
      };
      setTodos([...todos, newTodoObj]);
      setNewTodo('');
    }
  };

  const handleCheck = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (id, newText) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDueDateChange = (id, dueDate) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, dueDate: dueDate };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleClearCompleted = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            handleDueDateChange={handleDueDateChange}
          />
        ))}
      </ul>
      <button onClick={handleClearCompleted}>Clear Completed</button>
    </div>
  );
}

function TodoItem({
  todo,
  handleCheck,
  handleDelete,
  handleEdit,
  handleDueDateChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editText.trim() !== '') {
      handleEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  return (
    <li>
      {!isEditing ? (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheck(todo.id)}
          />
          <span
            style={todo.completed ? { textDecoration: 'line-through' } : {}}
          >
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => handleDelete(todo.id)}>Delete</button>
        </>
      ) : (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={() => handleDueDateChange(todo.id, dueDate)}>
        Set Due Date
      </button>
    </li>
  );
}

export default TodoApp;
