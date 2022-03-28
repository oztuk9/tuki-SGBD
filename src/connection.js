const { Pool } = require('pg')



const connectionStandar = (password) =>{
    try {
        const pool = new Pool({
            host: 'localhost',
            database: 'postgres',
            port: 5432,
            user: 'postgres',
            password: password
          })
          return pool;
    } catch (error) {
        console.log("La contraseña es incorrecta");
    }
}

const connectionEspecificDB = (password,db) =>{
    try {
        const pool = new Pool({
            host: 'localhost',
            database: db,
            port: 5432,
            user: 'postgres',
            password: password
          })
          return pool;
    } catch (error) {
        console.log("Error al conectar con la base de datos");
    }
}

module.exports = {
    connectionStandar,
    connectionEspecificDB
}