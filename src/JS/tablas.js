const storage = require('../JS/local')

const backIndex = document.getElementById('backIndex') 

/*texto*/

const encabezadoDB = document.getElementById('encabezadoDB')

//Colocar el nombre de la base de datos en el encabezado

const encabezado = () => {
    encabezadoDB.innerHTML += `${storage.getStorage("DBselected").db}`
}

document.addEventListener('DOMContentLoaded', e => {
    encabezado();
})


backIndex.addEventListener('click', e => {
    console.log('Evento accionado');
    let DBselected = {
        db:storage.getStorage("DBselected").db,
        online: true
     }
     storage.setStorage("DBselected",DBselected)
     location.href='index.html'
})