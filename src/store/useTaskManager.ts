import { useState } from "react";
import create, { State } from "zustand";

type Task = {
  id: number;
  title: string;
};

type TaskManagerState = {
  tasks: Task[];
  addTask: (title: string) => void;
  updateTask: (id: number, newTitle: string) => void;
  deleteTask: (id: number) => void;
  searchTask: (searchText: string) => void;
};

const useTaskManager = create<TaskManagerState>((set) => ({
  tasks: [],

  addTask: (title) => {
    set((state) => ({ tasks: [...state.tasks, { id: Date.now(), title }] }));
  },

  updateTask: (id, newTitle) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      ),
    }));
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    }));
  },

  searchTask: (searchText) => {
    const normalizedSearchText = searchText.toLowerCase();
    set((state) => ({
      tasks: state.tasks.filter((task) =>
        task.title.toLowerCase().includes(normalizedSearchText)
      ),
    }));
  },
}));

export { useTaskManager };
