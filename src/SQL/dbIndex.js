//Crear base de datos

const newDB = async (query,nameDB) => {
    try {
        await connection.connectionStandar(12345).query(query)
        cargarDBs();
        Toast.fire({
            icon: 'success',
            title: 'La base de datos: \"' + nameDB + '\" fue creada con exito',
            background: 'FFFF',
            width: 420
        })
    } catch (error) {
        console.log(error);
    }
}

//Eliminar base de datos

const deleteDB = async (query, nameDB) => {
    try {
        await connection.connectionStandar(12345).query(query)
        cargarDBs();
        Toast.fire({
            icon: 'success',
            title: 'La base de datos: \"' + nameDB + '\" fue eliminada con exito',
            background: 'FFFF',
            width: 420
        })
    } catch (error) {
        console.log(error);
    }
}

const usersConnected = async (query) => {
    try {
        const users = await connection.connectionStandar(12345).query(query)
        console.log(users);
    } catch (error) {
        console.log('error al consultar usuarios conectados');
    }
}

const ejectedUsers = async (query) => {
    try {
        await connection.connectionStandar(12345).query(query)
    } catch (error) {
        console.log('error al consultar usuarios conectados');
    }
}

module.exports = {
    newDB,
    deleteDB,
    usersConnected,
    ejectedUsers
}