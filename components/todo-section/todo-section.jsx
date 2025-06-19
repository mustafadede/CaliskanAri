import { getAPI, postAPI } from "@/services/fetchAPI";
import useTodoStore from "@/utils/todoStore";
import { useEffect, useState } from "react";
import TodoComponent from "./todo-component";

function TodoSection() {
    const [textColor, setTextColor] = useState(""); 
    const labelOptions = ["Work", "Personal", "Shopping", "Other"];
    const [bgColor, setBgColor] = useState("");
    const [newLabel, setNewLabel] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const {
    todos,
    editTitle,
    setEditId,
    deleteTodo,
    editId,
    setEditTitle,
    addTodo,
    updateTodo,
    setTodos,
    } = useTodoStore();
    useEffect(() => {
    const bgColorData = getAPI("/home/HomeBgColor");
    bgColorData
      .then(function (result) {
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
      getAPI("/home/Todo").then(res => {
        console.log(res)
         if (res) {
            setTodos(res);
          } else {
            setTodos([]); 
          }
        setLoading(false)
      }).catch(err => console.log(err))
  }, []);

    const handleEdit = (id, title) => {
        setEditId(id);
        setEditTitle(title);
    };

    const handleEditSave = (id) => {
       postAPI(`/home/Todo`, { id, title: editTitle }, "PUT").then(() => {
          updateTodo(id, editTitle);
          setEditId(null);
          setEditTitle("");
        })
    };


const handleAddTodo = () => {
  if (!newLabel || !newTitle) return;

  postAPI("/home/Todo", {
    label: newLabel,
    title: newTitle,
  }).then((createdTodo) => {
    addTodo(createdTodo);
    setNewLabel("");
    setNewTitle("");
  }).catch(err => {
    console.log(err)
  })
};

const handleDeleteTodo = (id) => {
  postAPI(`/home/Todo`, id, "DELETE").then(res => {
    deleteTodo(id);
  })
};

  return (
     <div
      className={`xl:pt-[0px] main-section-hover`}
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="container mx-auto py-0 md:py-20 px-4 md:px-20">
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
        <ul className="space-y-4 w-full">
        {!loading && todos.length === 0 && <p className="text-slate-500 w-full text-center">Todo list is empty. Create a new todo please!</p>}
         {loading && <p className="text-yellow-500 w-full text-center">Loading...</p>}
         {!loading && todos?.map((todo) => (
            <TodoComponent key={todo.id} todo={todo}
            setEditTitle={setEditTitle}
            deleteTodo={handleDeleteTodo}
            editTitle={editTitle}
            editId={editId}
            handleEditSave={handleEditSave}
            handleEdit={handleEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TodoSection