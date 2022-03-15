const connection = require('../connection')
const divDB = document.getElementById('canvas-body');


let alldb = "SELECT datname FROM pg_database"

divDB.addEventListener('click',e =>{
   console.log(e.delegateTarget);
   if (e.delegateTarget!=undefined) {
      console.log(e.delegateTarget.id);
   }else{
      console.log("No se a seleccionado una base de datos");
   }
})

const cargarDBs = async () => {
   try {
      divDB.innerHTML = "";
      console.log(alldb);
      const res = await connection.connectionStandar(12345).query(alldb)
      listDB = res.rows
      listDB.forEach(e => {
         console.log(e.datname);
         divDB.innerHTML += `<button id="${e.datname}" class="btn btn-outline-primary btn-db"
         data-bs-dismiss="offcanvas" aria-label="Close">${e.datname}</button>`
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

cargarDBs();