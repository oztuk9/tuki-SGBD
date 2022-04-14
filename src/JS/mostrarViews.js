const storage = require('../JS/local')
const dbView = require('../SQL/dbViews')
const connection = require('../connection')


const backIndex = document.getElementById('backIndex')
const trHead = document.getElementById('trHead')
const tablaName = storage.getStorage('view').nombre
const tbody = document.getElementById('tbody')

document.addEventListener('DOMContentLoaded', e => {
    cargarTablaCamposView();
})

backIndex.addEventListener('click', e => {
    let DBselected = {
        db: storage.getStorage("DBselected").db,
        online: true
    }
    storage.setStorage("DBselected", DBselected)
    location.href = 'index.html'
})

const cargarTablaCamposView = async () => {
    trHead.innerHTML = ''
    let queryViewData = `SELECT * FROM ${tablaName}`
    let queryFieldsView = `SELECT column_name FROM information_schema.columns 
    WHERE table_schema = 'public' AND table_name='${tablaName}'`
    const consultFields = await dbView.selectViewsFields(queryFieldsView);
    console.log(consultFields);
    consultFields.rows.forEach(e => {
        trHead.innerHTML += `<th>${e.column_name}</th>`
    });

    const selectViewData = await dbView.selectViewData(queryViewData)

//Esta es la forma en la que encontre como recorrer un JSON en internet

    selectViewData.rows.forEach(function(item) {
        console.log(item);
        let campo = "<tr>"
    	Object.keys(item).forEach(function(key) {
            campo += `<td>${item[key]}</td>`
    	console.log(key + ': ' +item[key])
    	})
        campo += "</tr>"
        tbody.innerHTML += `${campo}`
    })

//Esta es otra forma de recorrer un JSON que cree examinando el codigo de arriba

    selectViewData.rows.forEach(e => {
        let campo = "<tr>"
        Object.keys(e).forEach( el => {
            campo += `<td>${e[el]}</td>`
    	})
        campo += "</tr>"
    });
}