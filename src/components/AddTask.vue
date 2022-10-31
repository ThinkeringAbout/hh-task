<template>
    <div class="w-full flex-auto flex justify-center gap-10 items-center flex-col">
        <form action="" class="w-full flex-auto  flex justify-center gap-10 items-center flex-col" @submit.prevent="handleSubmit">
            <input v-model="this.title" type="text" class="lg:w-1/4 w-[90%] h-10 mx-auto border-2 border-violet-600 rounded-lg px-2 outline-none focus:shadow-md focus:shadow-violet-700 transition-all" maxlength="30" placeholder="Заголовок" minlength="5" required>
            <textarea v-model="this.text" name="description" placeholder="Текст задачи" id="description" cols="30" rows="10" class="lg:w-1/4 w-[90%] outline-none h-80 border-2 border-violet-600 focus:shadow-md focus:shadow-violet-700 transition-all rounded-lg p-2 resize-none" maxlength="250" minlength="20" required></textarea>
            <input required v-model="this.date" type="date" name="date" id="date" class="border-2 border-violet-600">
            <p v-if="!this.getCurrentDate && this.getCurrentDate !== undefined" class="-my-8 text-red-600 underline font-bold">Некорректная дата</p>
            <button :disabled="!this.isSubmitButtonActive" class="lg:w-1/6 w-1/2 h-12 disabled:hover:bg-white bg-white disabled disabled:text-slate-400 disabled:border-slate-400 text-violet-600 font-bold transition-all rounded-xl hover:bg-violet-600 border-violet-600 border-2 hover:text-white">Сохранить</button>
        </form>
    </div>
</template>

<script>
import ShortUniqueId from 'short-unique-id';
import { useMainStore } from '../stores/store';

const uid = new ShortUniqueId({length: 8});

export default {
    setup() {
        const store = useMainStore();
        return { store };
    },
    name: 'AddTask',
    data() {
        return {
            title: '',
            text: '',
            date: undefined,
        }
    },
    methods: {
        handleSubmit() {
            if (this.getCurrentDate) {
                // alert("Success");
                
                const task = {
                    title: this.title,
                    description: this.text,
                    date: new Date(this.date).getTime(),
                    isDone: false,
                    id: uid(),
                }
                this.store.addTask(task);
                this.title = '';
                this.text = '';
                this.date = undefined;
            };
        },
    },
    computed: {
        getCurrentDate() {
            const todayDate = Date.now();
            const today = new Date().getDate();
            const chosenDate = new Date(this.date).getTime();
            const chosenDay = new Date(this.date).getDate();
            if (this.date) {
                if (chosenDate > todayDate || (today == chosenDay && chosenDate - todayDate > -86400000)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return undefined;
            }
        },
        isSubmitButtonActive() {
            if (this.title.length >= 5 && this.text.length >= 20 && this.getCurrentDate) {
                return true;
            }
            return false;
        }
    }
}
</script>