import { defineStore } from "pinia";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  setDoc,
  deleteDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../firebase/firebase.js";

export const useMainStore = defineStore("main", {
  state: () => ({
    allTasks: [],
    isTasksFetching: false,
    sortingMode: "all",
  }),
  actions: {
    async getTasks() {
      const q = query(collection(db, "tasks"), orderBy("date", "asc"));
      const querySnapshot = onSnapshot(q, (doc) => {
        this.allTasks = [];
        doc.forEach((info) => {
          this.allTasks.push(info.data());
        });
      });
    },
    async updateTaskStatus(id, index) {
      const dbRef = doc(db, "tasks", id);
      if (this.getFilteredTasks[index].isDone) {
        await updateDoc(dbRef, {
          isDone: false,
        });
      } else {
        await updateDoc(dbRef, {
          isDone: true,
        });
      }
    },
    async addTask(task) {
      await setDoc(doc(db, "tasks", task.id), task);
    },
    async deleteTask(id) {
      await deleteDoc(doc(db, "tasks", id));
    },
  },
  getters: {
    getFilteredTasks() {
      if (this.sortingMode === "all") {
        return this.allTasks;
      } else if (this.sortingMode === "done") {
        return this.allTasks.filter((item) => item.isDone === true);
      }
      return this.allTasks.filter((item) => item.isDone === false);
    },
  },
});
