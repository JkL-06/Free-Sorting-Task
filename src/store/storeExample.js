import { defineStore } from "pinia";

export const useStore = defineStore("store-example", {
    state: {
        counter: 0
    },
    getters: {
        double() {
            return this.counter * 2;
        }
    },
    actions: {
        add() {
            this.counter++;
        }
    }
});