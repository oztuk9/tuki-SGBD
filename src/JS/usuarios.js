const dbUsuarios = require('../SQL/dbUsuarios')
const btnCreateUser = document.getElementById('btnCreateUser')
const userName = document.getElementById('userName')
const userPassword = document.getElementById('userPassword')
const superUser = document.getElementById('superUser')
const userCreateDataBase = document.getElementById('userCreateDataBase')
const userCreateRols = document.getElementById('userCreateRols')
const userLogin = document.getElementById('userLogin')


btnCreateUser.addEventListener('click',e=>{
    let superU = 'NOSUPERUSER'
    let createDB = 'NOCREATEDB'
    let createRole = 'NOCREATEROLE'
    let login = 'NOLOGIN'
    if (superUser.checked) {
        superU = 'SUPERUSER'
    }
    if (userCreateDataBase.checked) {
        createDB = 'CREATEDB'
    }
    if (userCreateRols.checked) {
        createRole='CREATEROLE'
    }
    if (userLogin.checked) {
        login='LOGIN'
    }
    let query = `CREATE USER ${userName.value} WITH ${superU} ${createDB} ${createRole} ${login} PASSWORD '${userPassword.value}'`
    console.log(query);
    dbUsuarios.newUser(query)
})