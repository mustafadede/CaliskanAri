
function TodoComponent({
    todo,
    setEditTitle,
    handleEditSave,
    handleEdit,
    deleteTodo,
    editTitle,
    editId
}) {
  return (
    <li className="flex items-center gap-4 bg-white/10 rounded p-4 shadow">
        <span className="px-2 py-2 bg-yellow-500 text-white rounded text-sm font-semibold">
        {todo.label}
        </span>
        {editId === todo.id ? (
        <input
            className="border rounded px-2 w-full py-1 mr-2"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleEditSave(todo.id)}
            autoFocus
        />
        ) : (
        <span className="flex-1">{todo.title}</span>
        )}
        {editId === todo.id ? (
        <button
            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            onClick={() => handleEditSave(todo.id)}
        >
            Save
        </button>
        ) : (
        <button
            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            onClick={() => handleEdit(todo.id, todo.title)}
        >
            Edit
        </button>
        )}
        <button
        className="bg-red-500 text-white px-2 py-1 rounded"
        onClick={() => deleteTodo(todo.id)}
        >
        Delete
        </button>
    </li>
  )
}

export default TodoComponent