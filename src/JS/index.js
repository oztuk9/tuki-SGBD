const connection = require('../connection')

let alldb = "SELECT datname FROM pg_database"

 const prueba = async () => {
     try {
        console.log(alldb);
        const res = await connection.connectionStandar(12345).query(alldb)
        console.log(res.rows.at(0).datname);
     } catch (error) {
        Toast.fire({
            icon: 'info',
            title: 'La contraseña es incorrecta',
            background: 'FFFF',
            width: 420
          })
     }
}

prueba();