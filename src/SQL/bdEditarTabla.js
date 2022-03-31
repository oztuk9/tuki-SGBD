

const obtenerCamposTabla = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
    }
}

const DROPCampo = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        Toast.fire({
            icon: 'success',
            title: 'Se a eliminado el campo',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
        cargarCamposTabla()
    } catch (error) {
        console.log(error);
    }
}

const addColumn = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        Toast.fire({
            icon: 'success',
            title: 'Se a agregado el nuevo campo a la tabla',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al agregar el nuevo campo',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
        console.log(error);
    }
}

const alterColumn = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al agregar el nuevo campo',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
        console.log(error);
    }
}

const fillTableForeign = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        return res
    } catch (error) {
        console.log(error);
    }
}

const consultPrimariKey = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        return res
    } catch (error) {
        console.log(error);
    }
}

const addForeignKey = async (query) =>{
    try {
        const res = await connection.connectionEspecificDB(12345,getStorage("DBselected").db).query(query)
        Toast.fire({
            icon: 'success',
            title: 'Se a agregado la foreign key',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al agregar la foreign key',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
        console.log(error);
    }
}


module.exports = {
    obtenerCamposTabla,
    DROPCampo,
    addColumn,
    alterColumn,
    fillTableForeign,
    consultPrimariKey,
    addForeignKey
}