const { getStorage } = require("../JS/local");

const crearFuncionTrigger = async (query) => {
    try {
        await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        Toast.fire({
            icon: 'success',
            title: 'La funcion se a creado con exito',
            background: 'FFFF',
            width: 420
        })
        console.log(query);
    } catch (error) {
        Toast.fire({
            icon: 'success',
            title: 'Error al crear la funcion',
            text: error,
            background: 'FFFF',
            width: 420
        })
    }
}

const consultGeneral = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        console.log(query);
        return res
    } catch (error) {
        console.log(error);
    }
}

const crearTrigger = async (query) => {
    try {
        await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        Toast.fire({
            icon: 'success',
            title: 'El trigger fue creado con exito',
            background: 'FFFF',
            width: 420
        })
        console.log(query);
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al crear el trigger',
            text: error,
            background: 'FFFF',
            width: 420
        })
    }
}

const DROPTriggers = async (query,trigger) => {
    try {
        await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        showTriggers()
        Toast.fire({
            icon: 'success',
            title: 'Se ha eliminado el trigger: '+trigger,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al eliminar el trigger',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    }
}

module.exports = {
    crearFuncionTrigger,
    consultGeneral,
    crearTrigger,
    DROPTriggers
}