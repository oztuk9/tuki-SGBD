const connection = require('../connection');
const dbIndex = require('../SQL/dbIndex')
const storage = require('../JS/local')

/*Elementos*/

/*Divs*/

const divDB = document.getElementById('canvas-body');
const myTabContent = document.getElementById('myTabContent')
const divIndex = document.getElementById('div-index')

/*Botones*/

const btnCreateDB = document.getElementById('btn-create-database');
const btnDeleteDB = document.getElementById('deleteDB');

/*Inputs*/

const nameNewDB = document.getElementById('name-new-db');

/*Se ejecuta despues de que la pagina carga por completo*/

const cleanDB = ()=> {
   let DBselected = {
      db:""
   }
   window.localStorage.setItem(DBselected ,JSON.stringify(DBselected))
} 

document.addEventListener('DOMContentLoaded', e => {
   if (storage.getStorage("DBselected") !== null) {
      console.log(storage.getStorage("DBselected"));

      if (storage.getStorage("DBselected").db!="") {
         myTabContent.classList.remove('div-no-visible')
         divIndex.classList.add('div-no-visible')
      }else{
         myTabContent.classList.add('div-no-visible')
         divIndex.classList.remove('div-no-visible')
      }
   }
   cargarDBs();
})

/*Variables*/
var filtro = '1234567890qwertyuiopasdfghjklñzxcvbnmQWERTYUIOPASDFGHJKLÑZXCVBNM';//Caracteres validos nombre DB

/*Funciones*/

//Eliminar espacios al teclear el nombre de la base de datos

nameNewDB.addEventListener('keyup',e => {
   out = "";
   for (let i = 0; i < nameNewDB.value.length; i++) {
      if (filtro.indexOf(nameNewDB.value.charAt(i)) != -1) 
      //Se añaden a la salida los caracteres validos
   out += nameNewDB.value.charAt(i);
   }
   nameNewDB.value=out;
})

//Seleccionar base de datos

divDB.addEventListener('click',e =>{
   console.log(e.delegateTarget);
   if (e.delegateTarget!=undefined) {
      console.log(e.delegateTarget.id);
      let DBselected = {
         db:e.delegateTarget.id
      }
      storage.setStorage("DBselected",DBselected)
      myTabContent.classList.remove('div-no-visible')
      divIndex.classList.add('div-no-visible')
   }else{
      console.log("No se a seleccionado una base de datos");
   }
})

//Creacion de base de datos

btnCreateDB.addEventListener('click', e => {
   let query = `CREATE DATABASE ${nameNewDB.value}`
   console.log(query);
   dbIndex.newDB(query,nameNewDB.value)
   nameNewDB.value=""
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
         if (e.datname!="postgres"&&e.datname!="template0"&&e.datname!="template1") {
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
      title: '¿Seguro que quiere eliminar la base de datos: '+DBselected+'?',
      showCancelButton: true,
      confirmButtonText: 'Siiuu',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
         dbIndex.ejectedUsers(queryDesconnectedUsers);
         DROPDB();
         cargarDBs();
      }
    })
})

const DROPDB = async () =>{
   let DBselected = storage.getStorage("DBselected").db
   let query = `DROP DATABASE IF EXISTS ${DBselected}`
   console.log(query);
   dbIndex.deleteDB(query,DBselected);
   DBselected="";
   myTabContent.classList.add('div-no-visible')
   divIndex.classList.remove('div-no-visible')
}

module.exports = {
   cleanDB
}