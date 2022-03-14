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

module.exports = {
    connectionStandar
}