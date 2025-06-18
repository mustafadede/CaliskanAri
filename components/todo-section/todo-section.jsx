import { getAPI } from "@/services/fetchAPI";
import useTodoStore from "@/utils/todoStore";
import { useEffect, useState } from "react";

function TodoSection() {
    const [textColor, setTextColor] = useState(""); 
    const labelOptions = ["Work", "Personal", "Shopping", "Other"];
    const [bgColor, setBgColor] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const {
    todos,
    editId,
    editTitle,
    setEditId,
    setEditTitle,
    addTodo,
    deleteTodo,
    updateTodo,
    } = useTodoStore();
    useEffect(() => {
    const bgColorData = getAPI("/home/HomeBgColor");
    bgColorData
      .then(function (result) {
        console.log(result);
        const mainBgColorInfo = result.find((item) => item.pageId === "main");
        if (mainBgColorInfo) {
          setBgColor(mainBgColorInfo.bgColor);
        } else {
          console.log("Main page için bgColor bulunamadı.");
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
    const textColorData = getAPI("/home/HomeTextColor"); // textColorData tanımlandı
    textColorData
      .then(function (result) {
        console.log(result);
        const mainTextColorInfo = result.find((item) => item.pageId === "main");
        if (mainTextColorInfo) {
          setTextColor(mainTextColorInfo.TextColor); 
        } else {
          console.log("Main page için textColor bulunamadı."); 
        }
      })
      .catch(function (error) {
        console.error("Hata oluştu:", error);
      });
  }, []);

    const handleEdit = (id, title) => {
        setEditId(id);
        setEditTitle(title);
    };

    const handleEditSave = (id) => {
        updateTodo(id, editTitle);
        setEditId(null);
        setEditTitle("");
    };


const handleAddTodo = () => {
  if (!newLabel || !newTitle) return;
  addTodo({ id: Date.now(), label: newLabel, title: newTitle });
  setNewLabel("");
  setNewTitle("");
};
  return (
     <div
      className={`xl:pt-[0px] main-section-hover`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto py-20 px-20">
        <h2 className="text-3xl font-bold text-center mb-4">Todo</h2>
       <div className="flex gap-2 mb-4 w-full">
          <select
            className="border rounded px-2 py-1"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
        >
            <option value="">Select label</option>
            {labelOptions.map((label) => (
            <option key={label} value={label}>
                {label}
            </option>
            ))}
        </select> 
        <input
            className="border rounded px-2 py-1 w-full"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
            className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
            onClick={handleAddTodo}
        >
            Add
        </button>
        </div>
        <ul className="space-y-4">
         {todos.map((todo) => (
            <li key={todo.id} className="flex items-center gap-4 bg-white/10 rounded p-4 shadow">
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
            ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoSection