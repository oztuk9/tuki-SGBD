//Crear base de datos

const { getStorage } = require("../JS/local");

const newTable = async (query) => {
    try {
        await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        Toast.fire({
            icon: 'success',
            title: 'Se ha creado la Tabla',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al crear la tabla',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    }
}

const selectTables = async (query) => {
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        return res
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    newTable,
    selectTables
}