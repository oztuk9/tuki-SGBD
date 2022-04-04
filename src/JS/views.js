const dbView = require('../SQL/dbViews')

/*Objeto vacio para añadir a los select*/

let optionVacio = document.createElement("option");
optionVacio.setAttribute("value", "");
let optionTextoVacio = document.createTextNode("");
optionVacio.appendChild(optionTextoVacio);

/*selects*/

const selectTablas = document.getElementById('selectTabla')
const selectCampoWhere = document.getElementById('selectCampoWhere')

/*botones*/

const openView = document.getElementById('createView')
const btnCreateView = document.getElementById('btn-create-view')


document.addEventListener('DOMContentLoaded', e => {

})

openView.addEventListener('click', e => {
    cargarTablas();
})

const cargarTablas = async () => {
    selectTablas.innerHTML = ""
    selectTablas.appendChild(optionVacio);
    const query = `select table_name from information_schema.tables where table_schema='public';`
    const tablas = await dbView.returnConsult(query)
    console.log(tablas.rows.length);
    tablas.rows.forEach(e => {
        let option = document.createElement("option");
        option.setAttribute("value", e.table_name);
        let optionTexto = document.createTextNode(e.table_name);
        option.appendChild(optionTexto);
        selectTablas.appendChild(option);
    });
}

selectTablas.addEventListener('change',async e => {
    selectCampoWhere.innerHTML = "";
    selectCampoWhere.appendChild(optionVacio);
    let query = `SELECT column_name FROM information_schema.columns
    WHERE table_name = '${selectTablas.value}'`;
    const campos = await dbView.returnConsult(query)
    campos.rows.forEach(e => {
        console.log(e);
        let option = document.createElement("option");
        option.setAttribute("value", e.column_name);
        let optionTexto = document.createTextNode(e.column_name);
        option.appendChild(optionTexto);
        selectCampoWhere.appendChild(option);
    });
})

btnCreateView.addEventListener('click', e =>{
    select = document.getElementById('inputCamposView')
    selectOperadorRelacional = document.getElementById('selectOperadorRelacional')
    inputCondicionView = document.getElementById('inputCondicionView')
    if (select.value==""||selectOperadorRelacional.value=="") {
        
    }
})