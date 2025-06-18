import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [
    { id: 1, label: 'Work', title: 'Finish project report' },
    { id: 2, label: 'Personal', title: 'Buy groceries' },
  ],
  editId: null,
  editTitle: '',
  setTodos: (todos) => set({ todos }),
  setEditId: (editId) => set({ editId }),
  setEditTitle: (editTitle) => set({ editTitle }),
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (id) => set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
  updateTodo: (id, newTitle) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    ),
  })),
}));

export default useTodoStore;
