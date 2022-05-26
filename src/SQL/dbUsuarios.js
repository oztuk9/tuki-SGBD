const { getStorage } = require("../JS/local");

const newUser = async (query) => {
    try {
        await connection.connectionEspecificDB(12345, getStorage("DBselected").db).query(query)
        console.log(userName.value);
        userName.innerHTML = ""
        userPassword.innerHTML = ""
        superUser.innerHTML = ""
        userCreateDataBase.innerHTML = ""
        userCreateRols.innerHTML = ""
        userLogin.innerHTML = ""
        Toast.fire({
            icon: 'success',
            title: 'Se ha creado el usuario',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } catch (error) {
        Toast.fire({
            icon: 'error',
            title: 'Error al crear el usuario',
            text: error,
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    }
}

module.exports = {
    newUser
}