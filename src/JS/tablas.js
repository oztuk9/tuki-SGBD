const storage = require('../JS/local')

/*Divs*/

const divNameTable = document.querySelector(".campos")

/*Botones*/


const backIndex = document.getElementById('backIndex')
const btnAddRegistro = document.querySelector(".btn-add-registro")

/*texto*/

const encabezadoDB = document.getElementById('encabezadoDB')

/*Variables*/

let count = 0;

let tiposDatos = ["","serial","boolean","varchar","smallint","int","bigint","numeric","real","double precision","date","time","timestamp"]

/*Funciones*/

document.querySelectorAll('[name=primarykey]').forEach((x) => x.checked = false);

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
        db: storage.getStorage("DBselected").db,
        online: true
    }
    storage.setStorage("DBselected", DBselected)
    location.href = 'index.html'
})

btnAddRegistro.addEventListener('click', e => {
    crearCampos();
})

//Mostrar los id de los elementos creados

const divsCount = () => {
    for (let i = 0; i < count; i++) {
        let arrayDivs = document.querySelector(`[class="campo${i}" ]`)
        console.log(arrayDivs);
    }
    console.log(divNameTable.childElementCount);
}

const crearCampos = () => {
    let nuevoCampo = document.createElement("div")
    nuevoCampo.setAttribute("class", "campo" + count)

    let spanNombre = document.createElement("span")
    spanNombre.setAttribute("class", "span-campo span-nombre" + count)
    spanNombre.textContent = "Nombre"

    let input = document.createElement("input")
    input.setAttribute("class", "input" + count + " input-nombre-campo")

    let spanTipo = document.createElement("span")
    spanTipo.setAttribute("class", "span-campo span-tipo-dato" + count)
    spanTipo.textContent = "Tipo de dato"

    let selectTipoDato = document.createElement("select")

    tiposDatos.forEach(e => {
        console.log("Entro al for");
        let option = document.createElement("option");
        option.setAttribute("value", e);
        let optionTexto = document.createTextNode(e);
        option.appendChild(optionTexto);
        selectTipoDato.appendChild(option)
    });

    let spanLongitudValores = document.createElement("span")
    spanLongitudValores.setAttribute("class", "span-campo span-lv" + count)
    spanLongitudValores.textContent = "Longitud/Valores"

    let inputVL = document.createElement("input")
    inputVL.setAttribute("class", "inputVL" + count + " input-VL")

    let spanNull = document.createElement("span")
    spanNull.setAttribute("class", "span-campo span-null" + count)
    spanNull.textContent = "Null"

    let checkNull = document.createElement("input")
    checkNull.setAttribute("class", "checkNull" + count)
    checkNull.setAttribute("type", "checkbox")

    let spanRadio = document.createElement("span")
    spanRadio.setAttribute("class", "span-campo span-radio" + count)
    spanRadio.textContent = "Primary key"

    let radioPrimaryKey = document.createElement("input")
    radioPrimaryKey.setAttribute("class", "radio-primary-key radio" + count)
    radioPrimaryKey.setAttribute("type", "radio")
    radioPrimaryKey.setAttribute("name", "primarykey")
    radioPrimaryKey.setAttribute("value", count)

    let btnEliminar = document.createElement("button")
    btnEliminar.setAttribute("class", "btn btn-danger boton-eliminar" + count)
    btnEliminar.setAttribute("id", count)
    btnEliminar.textContent = "Eliminar"
    btnEliminar.addEventListener('click', e => {
        //Con esto obtengo el ID del boton de obteniendo su atributo id
        console.log(btnEliminar.getAttribute("id"));
        //Aca hago lo mismo pero usando el evento y moviendome entre sus datos
        let clase = "campo" + e.path[0].id;
        console.log(clase);
        let divEliminar = document.querySelector(`[class="${clase}"]`)
        console.log(divEliminar);
        divNameTable.removeChild(divEliminar);
    })

    nuevoCampo.insertAdjacentElement("beforeend", spanNombre)
    nuevoCampo.insertAdjacentElement("beforeend", input)
    nuevoCampo.insertAdjacentElement("beforeend", spanTipo)
    nuevoCampo.insertAdjacentElement("beforeend", selectTipoDato)
    nuevoCampo.insertAdjacentElement("beforeend", spanLongitudValores)
    nuevoCampo.insertAdjacentElement("beforeend", inputVL)
    nuevoCampo.insertAdjacentElement("beforeend", spanNull)
    nuevoCampo.insertAdjacentElement("beforeend", checkNull)
    nuevoCampo.insertAdjacentElement("beforeend", spanRadio)
    nuevoCampo.insertAdjacentElement("beforeend", radioPrimaryKey)
    nuevoCampo.insertAdjacentElement("beforeend", btnEliminar)
    divNameTable.insertAdjacentElement("beforeend", nuevoCampo)
    count++;
    divsCount();
}