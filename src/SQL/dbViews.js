const { getStorage } = require("../JS/local");

const returnConsult = async (query) => {
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        return res
    } catch (error) {
        console.log(error);
    }
}

const consult = async (query) => {
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        showViews();
        Toast.fire({
            icon: 'success',
            title: 'La vista a sido creada con éxito',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al crear la vista',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
        console.log(error);
    }
}

const selectViews = async (query) => {
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        return res
    } catch (error) {
        console.log(error);
    }
}

const DROPViews = async (query,tabla) => {
    try {
        await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        showViews();
        Toast.fire({
            icon: 'success',
            title: 'Se ha eliminado la Vista: '+tabla,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al eliminar la Vista',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    }
}

module.exports = {
    returnConsult,
    consult,
    selectViews,
    DROPViews
}