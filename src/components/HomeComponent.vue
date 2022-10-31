<template>
  <div class="w-full flex-auto">
    <div class="sm:w-2/3 w-[90%] mx-auto">
      <div class="flex justify-between items-center">
        <select
          name="sort"
          id="sort"
          v-model="this.store.sortingMode"
          class="mt-2"
        >
          <option value="all">Все</option>
          <option value="done">Выполнено</option>
          <option value="processing">В процессе</option>
        </select>
      </div>
      <RouterLink
        :to="'task/' + task.id"
        v-for="(task, index) in this.store.getFilteredTasks"
        :key="task.id"
        class="mx-auto flex flex-col"
      >
        <div
          :class="{ 'border-green-700':task.isDone }"
          class="transition-all w-full min-h-14 border-4 my-4 rounded-bl-xl rounded-tr-xl bg-slate-700 text-white border-black flex sm:flex-row flex-col h-fit sm:h-14 py-2 sm:py-0 overflow-hidden justify-between items-center px-2 text-sm sm:text-base"
        >
          <h2
            class="flex-[80%] decoration-green-700 decoration-4 transition-all"
            :class="{ 'line-through': task.isDone }"
          >
            {{ task.title }}
          </h2>
          <p class="font-mono">{{ this.getTaskDate(task.date) }}</p>
          <div class="flex-[20%] flex justify-end">
            <button
              v-if="task.isDone"
              @click.prevent.stop="handleCheckClick(task.id, index)"
              class="bg-green-500 h-full w-7 border-green-500 border-2 sm:mx-2 mx-0.5 text-white font-bold hover:bg-white hover:text-green-500 transition-all"
            >
              ✓
            </button>
            <button
              v-else
              @click.prevent.stop="handleCheckClick(task.id, index)"
              class="bg-white h-full w-7 border-green-500 border-2 sm:mx-2 mx-0.5 text-green-500 font-bold hover:bg-green-500 hover:text-white transition-all"
            >
              ✓
            </button>
            <button
              @click.prevent.stop="handleDeleteClick(task.id)"
              class="h-full w-7 border-red-500 bg-red-500 text-white border-2 sm:mx-2 mx-0.5 transition-all hover:shadow-sm hover:shadow-red-600"
            >
              X
            </button>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script>
import { useMainStore } from "../stores/store.js";

export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  name: "Home",
  methods: {
    getTaskDate(timestamp) {
      const date = new Date(timestamp);
      const month =
        date.getMonth() < 10 ? "0" + Number(date.getMonth() + 1) : +date.getMonth()+1;
      const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const stringDate = `${day}.${month}.${date.getFullYear()}`;
      return stringDate;
    },
    handleCheckClick(id, index) {
      this.store.updateTaskStatus(id, index);
    },
    handleDeleteClick(id) {
      this.store.deleteTask(id);
    },
  },
};
</script>
