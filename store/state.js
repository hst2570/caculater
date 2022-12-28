export const useStateStore = defineStore('state', () => {
    const isHidden = ref(true);

    return {
        isHidden
    };
});
