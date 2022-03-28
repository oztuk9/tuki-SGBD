const storage = require('../JS/local')
const connection = require('../connection');

/*texto*/

const encabezadoDB = document.getElementById('encabezadoDB')

document.addEventListener('DOMContentLoaded', e => {
    encabezado();
})

const encabezado = () => {
    encabezadoDB.innerHTML += `${storage.getStorage("DBselected").db}/${storage.getStorage("tabla").nombre}`
}

backIndex.addEventListener('click', e => {
    let DBselected = {
        db: storage.getStorage("DBselected").db,
        online: true
    }
    storage.setStorage("DBselected", DBselected)
    location.href = 'index.html'
})