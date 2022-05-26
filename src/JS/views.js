const dbView = require('../SQL/dbViews')

/*Divs*/
const divViews = document.getElementById('div-views')

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
const btnCreateViewSelect= document.getElementById('btn-create-view-select')
const btnPreview = document.getElementById('btn-preview')
const closeModalView = document.getElementById('closeModalView')
const closeModalTrigger = document.getElementById('closeModalTrigger')

/*Variables*/
const trHead = document.getElementById('trHead')
const tbody = document.getElementById('tbody')
let queryCreateView = ``


document.addEventListener('DOMContentLoaded', e => {

})

openView.addEventListener('click', e => {
    cargarTablas();
})

const cargarTablas = async () => {
    selectCampoWhere.innerHTML = "";
    selectTablas.innerHTML = ""
    selectTablas.appendChild(optionVacio);
    const query = `select table_name from information_schema.tables where table_schema='public' AND table_type='BASE TABLE';`
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

selectTablas.addEventListener('change', async e => {
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

//Get data view

const obtenerDatos = (action) => {
    inputNombreView = document.getElementById('inputNombreView')
    select = document.getElementById('inputCamposView')
    selectOperadorRelacional = document.getElementById('selectOperadorRelacional')
    inputCondicionView = document.getElementById('inputCondicionView')
    if (select.value == "" || selectTablas.value == "" || inputNombreView.value == "") {
        Toast.fire({
            icon: 'info',
            title: 'Llene los campos necesarios',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } else {

        let previewSelect = ``
        if (selectCampoWhere.value == "") {
            queryCreateView = `CREATE VIEW ${inputNombreView.value} AS SELECT ${select.value} FROM ${selectTablas.value}`
            previewSelect = `SELECT ${select.value} FROM ${selectTablas.value}`
        } else {
            queryCreateView = `CREATE VIEW ${inputNombreView.value} AS SELECT ${select.value} FROM ${selectTablas.value} WHERE ${selectCampoWhere.value} ${selectOperadorRelacional.value} ${inputCondicionView.value}`
            previewSelect = `SELECT ${select.value} FROM ${selectTablas.value} WHERE ${selectCampoWhere.value} ${selectOperadorRelacional.value} ${inputCondicionView.value}`
        }
        if (action == true) {
            console.log(queryCreateView);
            dbView.consult(queryCreateView)
            queryCreateView = ``
        } else {
            const modalPreview = document.getElementById('show-view')
            modalPreview.style.display = 'block';
            modalPreview.classList.toggle('show')
            modalPreview.removeAttribute('aria-hidden')
            modalPreview.setAttribute('aria-modal','true')
            modalPreview.setAttribute('role','dialog')
            console.log(previewSelect);
            previewCamposView(previewSelect)
        }
    }
}

//Cerrar modal

const cerrarModal = (elemento) =>{
    const modal = document.getElementById(elemento)
    modal.style.display = 'none';
    modal.classList.toggle('show')
    modal.removeAttribute('aria-modal')
    modal.setAttribute('aria-hidden','true')
    modal.removeAttribute('role')
}

//Show preview

const previewCamposView = async (pvSelect) => {
    let count =0
    trHead.innerHTML = ''
    tbody.innerHTML = ''
    const selectViewData = await dbView.selectViewData(pvSelect)
    console.log(selectViewData);
    selectViewData.rows.forEach(e => {
        if (count==0) {
            Object.keys(e).forEach(el => {
                trHead.innerHTML += `<th>${el}</th>`
                console.log(el);
            })
            count ++;
        }
    });
    //Esta es la forma en la que encontre como recorrer un JSON en internet

    selectViewData.rows.forEach(function (item) {
        console.log(item);
        let campo = "<tr>"
        Object.keys(item).forEach(function (key) {
            campo += `<td>${item[key]}</td>`
            console.log(key + ': ' + item[key])
        })
        campo += "</tr>"
        tbody.innerHTML += `${campo}`
    })

    //Esta es otra forma de recorrer un JSON que cree examinando el codigo de arriba

    selectViewData.rows.forEach(e => {
        let campo = "<tr>"
        Object.keys(e).forEach(el => {
            campo += `<td>${e[el]}</td>`
            console.log(el);
        })
        campo += "</tr>"
    });
}

btnPreview.addEventListener('click', e => {
    obtenerDatos(false)
})

btnCreateView.addEventListener('click', e => {
    obtenerDatos(true)
})

btnCreateViewSelect.addEventListener('click', e => {
    if (queryCreateView!="") {
        console.log(queryCreateView);
        dbView.consult(queryCreateView)
        cerrarModal('show-view')
    }else{
        Toast.fire({
            icon: 'info',
            title: 'Llene los campos necesarios',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    }
})

//Cerrar modal view

closeModalView.addEventListener('click',e =>{
    cerrarModal('show-view')
})

const showViews = async () => {
    console.log('Se ejecuto showViews');
    divViews.innerHTML = "";
    console.log("Entro a la funcion showTables");
    let query = `select table_name from information_schema.tables where table_schema='public' AND table_type='VIEW'`
    const res = await dbView.selectViews(query)
    for (let i = 0; i < res.rowCount; i++) {
        let nuevoCampo = document.createElement("div")
        nuevoCampo.setAttribute("id", "V" + i)
        nuevoCampo.setAttribute("class", "div-tablas")

        let spanNombre = document.createElement("span")
        spanNombre.setAttribute("class", "span-campo")
        spanNombre.setAttribute("id", "span-nombrev" + i)
        spanNombre.textContent = res.rows[i].table_name

        let divBtn = document.createElement("div")

        let btnEliminar = document.createElement("button")
        btnEliminar.setAttribute("class", "btn btn-danger btn-table")
        btnEliminar.setAttribute("id", 'V' + i)
        btnEliminar.textContent = "Eliminar"
        btnEliminar.addEventListener('click', e => {
            //Con esto obtengo el ID del boton de obteniendo su atributo id
            console.log(btnEliminar.getAttribute("id"));
            //Aca hago lo mismo pero usando el evento y moviendome entre sus datos
            let id = "span-nombrev" + (e.path[0].id).substr(1);
            console.log(id);
            let divEliminar = document.querySelector(`[id="${id}"]`)
            console.log(divEliminar.textContent);
            eliminarViews(divEliminar.textContent);
        })

        let btnEditar = document.createElement("button")
        btnEditar.setAttribute("class", "btn btn-primary btn-table")
        btnEditar.setAttribute("id", "editV" + i)
        btnEditar.textContent = "Ver"
        btnEditar.addEventListener('click', e => {
            let id = "span-nombrev" + (e.path[0].id).substr(5);
            console.log(id);
            let divEditar = document.querySelector(`[id="${id}"]`)
            console.log(divEditar.textContent);
            let view = {
                nombre: divEditar.textContent
            }
            storage.setStorage("view", view)
            location.href = './mostrarView.html'
        })

        divViews.insertAdjacentElement("beforeend", nuevoCampo)
        nuevoCampo.insertAdjacentElement("beforeend", spanNombre)
        nuevoCampo.insertAdjacentElement("beforeend", divBtn)
        divBtn.insertAdjacentElement("beforeend", btnEliminar)
        divBtn.insertAdjacentElement("beforeend", btnEditar)
    }
}

const eliminarViews = (tabla) => {
    query = `DROP VIEW IF EXISTS ${tabla}`;
    dbView.DROPViews(query, tabla)
}

/*Cerrar modal trigger*/
closeModalTrigger.addEventListener('click', e => {

})