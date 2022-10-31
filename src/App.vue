<template>
  <header class="w-full h-16 border border-black bg-white/60 flex justify-start items-center">
    <RouterLink class="mx-2 font-bold text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 text-2xl bg-clip-text transition-all hover:scale-110 duration-500" to="/add">Add</RouterLink>
    <RouterLink class="mx-2 font-bold text-transparent bg-gradient-to-r from-sky-500 to-emerald-500 text-2xl bg-clip-text transition-all hover:scale-110 duration-500" to="/">Home</RouterLink>
  </header>
  <RouterView />
</template>

<script>
import { useMainStore } from "./stores/store";
export default {
  setup() {
    const store = useMainStore();
    return { store };
  },
  mounted() {
    this.store.getTasks();
  },
};
</script>
