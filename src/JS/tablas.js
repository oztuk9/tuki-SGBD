const storage = require('../JS/local')
const connection = require('../connection');
const dbTablas = require('../SQL/dbTablas')

/*Divs*/

const divNameTable = document.querySelector(".campos")

/*Botones*/


const backIndex = document.getElementById('backIndex')
const btnAddRegistro = document.querySelector(".btn-add-registro")
const btnCrearTabla = document.getElementById('btnCrearTabla')

/*texto*/

const encabezadoDB = document.getElementById('encabezadoDB')

/*Inputs*/

const nombreTabla = document.querySelector(`[id="nombre-db"]`)

/*Variables*/

let count = 0;

let posiciones = []

let tiposDatos = ["", "serial", "boolean", "varchar", "char", "text", "smallint", "int", "bigint", "numeric", "real", "double precision", "date", "time", "timestamp"]

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
    for (let a = 0; a < count; a++) {
        let arrayDivs = document.getElementById(`campo${a}`)
        console.log("Campos existentes= ");
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

    let inputNombre = document.createElement("input")
    inputNombre.setAttribute("id", "input" + count)
    inputNombre.setAttribute("class", "input-campo")
    inputNombre.addEventListener('keyup',e => {
        out = "";
        for (let i = 0; i < inputNombre.value.length; i++) {
           if (filtro.indexOf(inputNombre.value.charAt(i)) != -1) 
           //Se añaden a la salida los caracteres validos
        out += inputNombre.value.charAt(i);
        }
        inputNombre.value=out;
     })

    let spanTipo = document.createElement("span")
    spanTipo.setAttribute("id", "span-tipo-dato" + count)
    spanTipo.setAttribute("class", "span-campo")
    spanTipo.textContent = "Tipo de dato"

    let selectTipoDato = document.createElement("select")
    selectTipoDato.setAttribute("id", "selectDato" + count)
    selectTipoDato.setAttribute("class", "input-campo")

    tiposDatos.forEach(e => {
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
    spanNull.textContent = "Not null"

    let checkNull = document.createElement("input")
    checkNull.setAttribute("id", "checkNull" + count)
    checkNull.setAttribute("class", "input-check-null")
    checkNull.setAttribute("type", "checkbox")

    let spanDefault = document.createElement("span")
    spanDefault.setAttribute("id", "span-default" + count)
    spanDefault.setAttribute("class", "span-campo")
    spanDefault.textContent = "Default"

    let inputDefault = document.createElement("input")
    inputDefault.setAttribute("id", "inputDefault" + count)
    inputDefault.setAttribute("class", "input-campo")

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
    btnEliminar.setAttribute("class", "btn btn-danger")
    btnEliminar.setAttribute("id", count)
    btnEliminar.textContent = "Eliminar"
    btnEliminar.addEventListener('click', e => {
        //Con esto obtengo el ID del boton de obteniendo su atributo id
        console.log(btnEliminar.getAttribute("id"));
        //Aca hago lo mismo pero usando el evento y moviendome entre sus datos
        let id = "campo" + e.path[0].id;
        console.log(id);
        let divEliminar = document.querySelector(`[id="${id}"]`)
        console.log(divEliminar);
        for (let i = 0; i < posiciones.length; i++) {
            console.log("El id es= ");
            console.log(e.path[0].id);
            console.log("posicion eliminada: ");
            console.log(i);
            if (posiciones[i] == e.path[0].id) {
                posiciones.splice(i, 1)
            }
        }
        divNameTable.removeChild(divEliminar);
        posiciones.forEach(e => {
            console.log(e);
        });
    })

    nuevoCampo.insertAdjacentElement("beforeend", spanNombre)
    nuevoCampo.insertAdjacentElement("beforeend", inputNombre)
    nuevoCampo.insertAdjacentElement("beforeend", spanTipo)
    nuevoCampo.insertAdjacentElement("beforeend", selectTipoDato)
    nuevoCampo.insertAdjacentElement("beforeend", spanLongitudValores)
    nuevoCampo.insertAdjacentElement("beforeend", inputVL)
    nuevoCampo.insertAdjacentElement("beforeend", spanNull)
    nuevoCampo.insertAdjacentElement("beforeend", checkNull)
    nuevoCampo.insertAdjacentElement("beforeend", spanDefault)
    nuevoCampo.insertAdjacentElement("beforeend", inputDefault)
    nuevoCampo.insertAdjacentElement("beforeend", spanRadio)
    nuevoCampo.insertAdjacentElement("beforeend", radioPrimaryKey)
    nuevoCampo.insertAdjacentElement("beforeend", btnEliminar)
    divNameTable.insertAdjacentElement("beforeend", nuevoCampo)
    posiciones.push(count)
    posiciones.forEach(e => {
        console.log(e);
    });
    count++;
}

btnCrearTabla.addEventListener('click', e => {
    obtenerDatos();
})

const obtenerDatos = () => {
    let nombreDatosFull = true
    let tipoDatoFull = true
    let queryCrearTabla = `CREATE TABLE IF NOT EXISTS `;
    let LV = ""
    let notNull = ""
    let dfData = ""
    let primarykey = ""
    queryCrearTabla += `${nombreTabla.value}(`;
    posiciones.forEach(i => {
        let nombreCampo = document.querySelector(`[id="input${i}"]`)
        let selectDato = document.querySelector(`[id="selectDato${i}"]`)
        let longitudValores = document.querySelector(`[id="inputVL${i}"]`)
        let checkNull = document.querySelector(`[id="checkNull${i}"]`)
        let defaultData = document.querySelector(`[id="inputDefault${i}"]`)
        let radioTipoDato = document.querySelector(`[id="primarykey${i}"]`)


        if (checkNull.checked) {
            console.log("El checkButton esta seleccionado");
            notNull = " not null"
        } else {
            console.log("El checkButton NO esta seleccionado");
        }

        if (longitudValores.value != "") {
            console.log("Entro al if de la longitud de valores");
            console.log(longitudValores.value);
            LV = `(${longitudValores.value})`
        } else {
            LV = ""
        }

        if (defaultData.value != "") {
            dfData = ` default ${defaultData.value}`
        }

        if (radioTipoDato.checked) {
            console.log("El RadioButton esta seleccionado");
            primarykey = " PRIMARY KEY"
        } else {
            console.log("El RadioButton NO esta seleccionado");
            primarykey = ""
        }
        console.log(i);
        queryCrearTabla += `${nombreCampo.value} ${selectDato.value}${LV}${notNull}${dfData}${primarykey}`
        i + 1 < posiciones.length ? queryCrearTabla += `,` : queryCrearTabla += `);`

        console.log("Entro al else si el nombre de la tabla no esta vacio");
        if (nombreCampo.value == "" || nombreDatosFull == false) {
            nombreDatosFull = false
        } else {
            if (selectDato.value == "" || tipoDatoFull == false) {
                tipoDatoFull = false
            }
        }

    });
    if (posiciones.length == 0) {
        queryCrearTabla += `);`
    }
    if (nombreTabla == "") {
        Toast.fire({
            icon: 'info',
            title: 'Coloca el nombre de la tabla',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } else {
        console.log("Los nombres estan llenos: " + nombreDatosFull);
        console.log("Los tipos de datos esta seleccionados" + tipoDatoFull);
        if (nombreDatosFull == false) {
            Toast.fire({
                icon: 'info',
                title: 'Coloca el nombre de todos los campos',
                background: 'FFFF',
                width: 420,
                timer: 4000,
            })
        } else {
            if (tipoDatoFull == false) {
                Toast.fire({
                    icon: 'info',
                    title: 'Selecciona todos los tipos de datos',
                    background: 'FFFF',
                    width: 420,
                    timer: 4000,
                })
            } else {
                dbTablas.newTable(queryCrearTabla)
                console.log(queryCrearTabla);
            }
        }
    }
}

var filtro = '1234567890qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNMÑ_';//Caracteres validos nombre DB

nombreTabla.addEventListener('keyup',e => {
   out = "";
   for (let i = 0; i < nombreTabla.value.length; i++) {
      if (filtro.indexOf(nombreTabla.value.charAt(i)) != -1) 
      //Se añaden a la salida los caracteres validos
   out += nombreTabla.value.charAt(i);
   }
   nombreTabla.value=out;
})