const storage = require('../JS/local')

const backIndex = document.getElementById('backIndex') 

backIndex.addEventListener('click', e => {
    console.log('Evento accionado');
    let DBselected = {
        db:storage.getStorage("DBselected").db,
        online: true
     }
     storage.setStorage("DBselected",DBselected)
     location.href='index.html'
})