

export const setItemToLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value));
};

export const getItemFromLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
};

export const removeItemFromLocalStorage = (key) => {
    localStorage.removeItem(key)
};

export const clearLocalStorage = () => {
    localStorage.clear()
}

