const connection = require('../connection');
const dbIndex = require('../SQL/dbIndex')
const dbTablas = require('../SQL/dbTablas')
const storage = require('../JS/local')

/*Elementos*/

/*Divs*/

const divDB = document.getElementById('canvas-body');
const myTabContent = document.getElementById('myTabContent')
const divIndex = document.getElementById('div-index')
const divTables = document.getElementById('div-tables')
const divNameTable = document.querySelector(".div-tables")

/*Botones*/

const btnCreateDB = document.getElementById('btn-create-database');
const btnDeleteDB = document.getElementById('deleteDB');

/*Inputs*/

const nameNewDB = document.getElementById('name-new-db');

/*Se ejecuta despues de que la pagina carga por completo*/



/*Variables*/
var filtro = '1234567890qwertyuiopasdfghjklñzxcvbnm_';//Caracteres validos nombre DB

/*Funciones*/

document.addEventListener('DOMContentLoaded', e => {
   if (storage.getStorage("DBselected") !== null) {
      console.log(storage.getStorage("DBselected"));
      if (storage.getStorage("DBselected").online == true) {
         encabezado();
         showTables();
         let DBselected = {
            db: storage.getStorage("DBselected").db,
            online: false
         }
         storage.setStorage("DBselected", DBselected)
         myTabContent.classList.remove('div-no-visible')
         divIndex.classList.add('div-no-visible')
      }
   }
   cargarDBs();
})

const encabezado = () => {
   encabezadoDB.innerHTML = ``
   encabezadoDB.innerHTML += `${storage.getStorage("DBselected").db}`
}


//Eliminar espacios al teclear el nombre de la base de datos

nameNewDB.addEventListener('keyup', e => {
   out = "";
   for (let i = 0; i < nameNewDB.value.length; i++) {
      if (filtro.indexOf(nameNewDB.value.charAt(i)) != -1)
         //Se añaden a la salida los caracteres validos
         out += nameNewDB.value.charAt(i);
   }
   nameNewDB.value = out;
})

//Seleccionar base de datos

divDB.addEventListener('click', e => {
   console.log(e.delegateTarget);
   if (e.delegateTarget != undefined) {
      console.log(e.delegateTarget.id);
      let DBselected = {
         db: e.delegateTarget.id,
         online: true
      }
      storage.setStorage("DBselected", DBselected)
      myTabContent.classList.remove('div-no-visible')
      divIndex.classList.add('div-no-visible')
      encabezado();
      showTables();
   } else {
      console.log("No se a seleccionado una base de datos");
   }
})

//Creacion de base de datos

const createDB = () => {
   if (nameNewDB.value == "") {
      Toast.fire({
         icon: 'error',
         title: 'Coloca el nombre de la base de datos',
         background: 'FFFF',
         width: 420
      })
   } else {
      let query = `CREATE DATABASE ${nameNewDB.value}`
      console.log(query);
      dbIndex.newDB(query, nameNewDB.value)
      nameNewDB.value = ""
   }
}

btnCreateDB.addEventListener('click', e => {
   createDB();
})

//Cargar sidebar con las bases de datos

const cargarDBs = async () => {
   let allDB = "SELECT datname FROM pg_database"
   try {
      divDB.innerHTML = "";
      console.log(allDB);
      const res = await connection.connectionStandar(12345).query(allDB)
      listDB = res.rows
      listDB.forEach(e => {
         if (e.datname != "postgres" && e.datname != "template0" && e.datname != "template1") {
            console.log(e.datname);
            divDB.innerHTML += `<button id="${e.datname}" class="btn btn-outline-primary btn-db"
            data-bs-dismiss="offcanvas" aria-label="Close">${e.datname}</button>`
         }
      });

   } catch (error) {
      Toast.fire({
         icon: 'info',
         title: 'La contraseña es incorrecta',
         background: 'FFFF',
         width: 420
      })
   }
}

btnDeleteDB.addEventListener('click', e => {
   let DBselected = storage.getStorage("DBselected").db
   console.log(DBselected);
   let queryUsersConnected = `SELECT COUNT(*) AS users_online FROM pg_stat_activity WHERE datname='${DBselected}'`
   let queryDesconnectedUsers = `SELECT pg_terminate_backend(procpid) FROM pg_stat_activity WHERE datname='${DBselected}' AND procpid<>pg_backend_pid()`
   Swal.fire({
      title: '¿Seguro que quiere eliminar la base de datos: ' + DBselected + '?',
      showCancelButton: true,
      confirmButtonText: 'Siiuu',
   }).then((result) => {
      if (result.isConfirmed) {
         dbIndex.usersConnected(queryUsersConnected)
         dbIndex.ejectedUsers(queryDesconnectedUsers);
         DROPDB();
      }
   })
})

const DROPDB = async () => {
   let DBselected = storage.getStorage("DBselected").db
   let query = `DROP DATABASE IF EXISTS ${DBselected}`
   console.log(query);
   dbIndex.deleteDB(query, DBselected);
   DBselected = "";
   myTabContent.classList.add('div-no-visible')
   divIndex.classList.remove('div-no-visible')
   let DBselect = {
      db: "",
      online: false
   }
   storage.setStorage("DBselected", DBselect)
   encabezado();
}

const showTables = async () => {
   divTables.innerHTML = "";
   console.log("Entro a la funcion showTables");
   let query = `select table_name from information_schema.tables where table_schema='public';`
   const res = await dbTablas.selectTables(query)
   for (let i = 0; i < res.rowCount; i++) {
      let nuevoCampo = document.createElement("div")
      nuevoCampo.setAttribute("id", "campo" + i)
      nuevoCampo.setAttribute("class", "div-tablas")

      let spanNombre = document.createElement("span")
      spanNombre.setAttribute("class", "span-campo")
      spanNombre.setAttribute("id", "span-nombre" + i)
      spanNombre.textContent = res.rows[i].table_name
      
      let divBtn = document.createElement("div")

      let btnEliminar = document.createElement("button")
      btnEliminar.setAttribute("class", "btn btn-danger btn-table")
      btnEliminar.setAttribute("id", i)
      btnEliminar.textContent = "Eliminar"
      btnEliminar.addEventListener('click', e => {
         //Con esto obtengo el ID del boton de obteniendo su atributo id
         console.log(btnEliminar.getAttribute("id"));
         //Aca hago lo mismo pero usando el evento y moviendome entre sus datos
         let id = "span-nombre" + e.path[0].id;
         console.log(id);
         let divEliminar = document.querySelector(`[id="${id}"]`)
         console.log(divEliminar.textContent);
         eliminarTabla(divEliminar.textContent);
      })

      let btnEditar = document.createElement("button")
      btnEditar.setAttribute("class", "btn btn-primary btn-table")
      btnEditar.setAttribute("id", "edit"+i)
      btnEditar.textContent = "Editar"
      btnEditar.addEventListener('click', e => {
         let id = "span-nombre" + (e.path[0].id).substr(4);
         console.log(id);
         let divEditar = document.querySelector(`[id="${id}"]`)
         console.log(divEditar.textContent);
         let tabla = {
            nombre: divEditar.textContent
         }
         storage.setStorage("tabla",tabla)
         location.href = './editar_tablas.html'
      })

      divTables.insertAdjacentElement("beforeend", nuevoCampo)
      nuevoCampo.insertAdjacentElement("beforeend", spanNombre)
      nuevoCampo.insertAdjacentElement("beforeend", divBtn)
      divBtn.insertAdjacentElement("beforeend", btnEliminar)
      divBtn.insertAdjacentElement("beforeend", btnEditar)
   }
}

const eliminarTabla = (tabla) => {
   query = `DROP TABLE IF EXISTS ${tabla}`;
   dbTablas.DROPTables(query, tabla)
}