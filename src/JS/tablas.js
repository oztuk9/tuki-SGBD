const storage = require('../JS/local')

/*Divs*/

const divNameTable = document.querySelector(".campos")

/*Botones*/


const backIndex = document.getElementById('backIndex')
const btnAddRegistro = document.querySelector(".btn-add-registro")
const btnCrearTabla = document.getElementById('btnCrearTabla')

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
        let arrayDivs = document.querySelector(`[id="campo${i}"]`)
        console.log(arrayDivs);
    }
    console.log(divNameTable.childElementCount);
    return divNameTable.childElementCount;
}

//Creamos los campos de la tabla que vamos a crear

const crearCampos = () => {
    let nuevoCampo = document.createElement("div")
    nuevoCampo.setAttribute("id", "campo" + count)
    nuevoCampo.setAttribute("class", "div-campos-tabla")

    let spanNombre = document.createElement("span")
    spanNombre.setAttribute("class", "span-campo span-nombre" + count)
    spanNombre.textContent = "Nombre"

    let input = document.createElement("input")
    input.setAttribute("id", "input" + count)
    input.setAttribute("class", "input-campo")

    let spanTipo = document.createElement("span")
    spanTipo.setAttribute("id", "span-tipo-dato" + count)
    spanTipo.setAttribute("class", "span-campo")
    spanTipo.textContent = "Tipo de dato"

    let selectTipoDato = document.createElement("select")
    selectTipoDato.setAttribute("id", "selectDato" + count)
    selectTipoDato.setAttribute("class", "input-campo")

    tiposDatos.forEach(e => {
        console.log("Entro al for");
        let option = document.createElement("option");
        option.setAttribute("value", e);
        let optionTexto = document.createTextNode(e);
        option.appendChild(optionTexto);
        selectTipoDato.appendChild(option)
    });

    let spanLongitudValores = document.createElement("span")
    spanLongitudValores.setAttribute("id", "span-lv" + count)
    spanLongitudValores.setAttribute("class", "span-campo")
    spanLongitudValores.textContent = "Longitud/Valores"

    let inputVL = document.createElement("input")
    inputVL.setAttribute("id", "inputVL" + count)
    inputVL.setAttribute("class", "input-campo")

    let spanNull = document.createElement("span")
    spanNull.setAttribute("id", "span-null" + count)
    spanNull.setAttribute("class", "span-campo")
    spanNull.textContent = "Null"

    let checkNull = document.createElement("input")
    checkNull.setAttribute("id", "checkNull" + count)
    checkNull.setAttribute("class", "input-check-null")
    checkNull.setAttribute("type", "checkbox")

    let spanRadio = document.createElement("span")
    spanRadio.setAttribute("class", "span-campo span-radio" + count)
    spanRadio.textContent = "Primary key"

    let radioPrimaryKey = document.createElement("input")
    radioPrimaryKey.setAttribute("id", "primarykey" + count)
    radioPrimaryKey.setAttribute("class", "radio-primary-key")
    radioPrimaryKey.setAttribute("type", "radio")
    radioPrimaryKey.setAttribute("name", "primarykey")
    radioPrimaryKey.setAttribute("value", count)

    let btnEliminar = document.createElement("button")
    btnEliminar.setAttribute("id", "boton-eliminar" + count)
    btnEliminar.setAttribute("class", "btn btn-danger")
    btnEliminar.setAttribute("id", count)
    btnEliminar.textContent = "Eliminar"
    btnEliminar.addEventListener('click', e => {
        //Con esto obtengo el ID del boton de obteniendo su atributo id
        console.log(btnEliminar.getAttribute("id"));
        //Aca hago lo mismo pero usando el evento y moviendome entre sus datos
        let clase = "campo" + e.path[0].id;
        console.log(clase);
        let divEliminar = document.querySelector(`[id="${clase}"]`)
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
}

btnCrearTabla.addEventListener('click',e =>{
    let queryCrearTabla = `CREATE TABLE `;
    let nombreCampo = document.querySelector(`[class="nombre-db"]`).value
    queryCrearTabla += `${nombreCampo}(`
    for (let i = 0; i < divsCount(); i++) {
        let nombreCampo = document.querySelector(`[id="input${i}"]`)
        let selectDato = document.querySelector(`[id="selectDato${i}"]`)
        let longitudValores = document.querySelector(`[id="inputVL${i}"]`)
        let checkNull = document.querySelector(`[id="checkNull${i}"]`)
        let radioTipoDato = document.querySelector(`[id="primarykey${i}"]`)
        console.log(longitudValores.value);
        console.log(nombreCampo.value);
        console.log(selectDato.value);
        if(checkNull.checked){
            console.log("El checkButton esta seleccionado");
        }else{
            console.log("El checkButton NO esta seleccionado");
        }
        if(radioTipoDato.checked){
            console.log("El RadioButton esta seleccionado");
        }else{
            console.log("El RadioButton NO esta seleccionado");
        }
        queryCrearTabla += `${nombreCampo.value},`
    }
    console.log(queryCrearTabla);
})

const obtenerDatos = () =>{

}