import { defineStore } from "pinia";

export const useColorScheme = defineStore("color-scheme", {
    state() {
        if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return {
                colorScheme: "dark"
            }
        }
        return {
            colorScheme: "light"
        }
    },
    getters: {
        currScheme() {
            return this.colorScheme;
        }
    },
    actions: {
        switch(colorScheme) {
            this.colorScheme = colorScheme;
        }
    }
})