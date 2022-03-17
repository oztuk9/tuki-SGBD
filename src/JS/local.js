const setStorage = (name,data) => {
    window.localStorage.setItem(name ,JSON.stringify(data))
}

const getStorage = name => {
    return JSON.parse(window.localStorage.getItem(name))
}

module.exports = {
    setStorage,
    getStorage
}