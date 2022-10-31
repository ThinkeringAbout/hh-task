<template>
    <div class="w-full flex-auto flex justify-center gap-10 items-center flex-col">
        <div class="w-full flex-auto  flex justify-center gap-10 items-center flex-col">
            <h3 class="text-2xl font-bold">{{ this.store.allTasks.filter(item => item.id === this.$route.params.id)[0].title }}</h3>
            <p class="break-words font-serif w-[90%] sm:w-1/2 md:w-1/3 lg:w-1/4 border-2 border-black p-2 bg-white text-xl">{{ this.store.allTasks.filter(item => item.id === this.$route.params.id)[0].description }}</p>
        </div>
    </div>
</template>

<script>
import { useMainStore } from '../stores/store';

export default {
    setup() {
        const store = useMainStore();
        return { store };
    },
    name: 'ViewTask',
}
</script>