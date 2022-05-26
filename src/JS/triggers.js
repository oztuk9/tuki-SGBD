const dbTriggers = require('../SQL/bdTriggers')
const nombreFuncionTrigger = document.getElementById('nombreFuncionTrigger')
const sentenciaTrigger = document.getElementById('sentenciaTrigger')
const btnCreateFunctionTrigger = document.getElementById('btnCreateFunctionTrigger')
const selectFunction = document.getElementById('selectFunction')
const btnModalCreateTrigger = document.getElementById('createTrigger')
const selectDB = document.getElementById('selectDB')
const selectTime = document.getElementById('selectTime')
const selectOperation = document.getElementById('selectOperation')
const nombreTrigger = document.getElementById('nombreTrigger')
const btnCreateTrigger = document.getElementById('btn-create-trigger')
const divTriggers = document.getElementById('div-triggers')


btnCreateFunctionTrigger.addEventListener('click', e => {
    crearFuncionTrigger()
})

btnModalCreateTrigger.addEventListener('click',e=>{
    console.log('dio click aquí');
    getListFunctionTrigger()
    getTableList()
})

const getListFunctionTrigger = async () => {
    selectFunction.innerHTML = ''
    let query = `SELECT
                routine_name 
                FROM
                information_schema.routines 
                WHERE
                specific_schema LIKE 'public'`
    const functiones = await dbTriggers.consultGeneral(query)
    functiones.rows.forEach(e => {
        console.log(e.routine_name);
        let option = document.createElement("option");
        option.setAttribute("value", e.routine_name);
        let optionTexto = document.createTextNode(e.routine_name);
        option.appendChild(optionTexto);
        selectFunction.appendChild(option)
    })
}

const getTableList = async () =>{
    selectDB.innerHTML = ''
    let query = `select table_name from information_schema.tables 
    where table_schema='public' AND table_type='BASE TABLE';`
    const tablas = await dbTriggers.consultGeneral(query)
    tablas.rows.forEach(e => {
        console.log(e.table_name);
        let option = document.createElement("option");
        option.setAttribute("value", e.table_name);
        let optionTexto = document.createTextNode(e.table_name);
        option.appendChild(optionTexto);
        selectDB.appendChild(option)
    })
}

const crearFuncionTrigger = () => {
    if (nombreFuncionTrigger.value == "") {
        Toast.fire({
            icon: 'info',
            title: 'Coloca el nombre de la funcion',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } else if (sentenciaTrigger.value == "") {
        Toast.fire({
            icon: 'info',
            title: 'Coloque la sentencia',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } else {
        let sqlFuntionTrigger =
            `CREATE OR REPLACE FUNCTION ${nombreFuncionTrigger.value}() 
            RETURNS TRIGGER 
            LANGUAGE PLPGSQL
            AS $$
            BEGIN
            ${sentenciaTrigger.value};
            END;
            $$;`
        console.log(sqlFuntionTrigger);
        dbTriggers.crearFuncionTrigger(sqlFuntionTrigger)
    }
}

btnCreateTrigger.addEventListener('click',e=>{
    crearTrigger()
    showTriggers()
})

const crearTrigger = async () =>{
    let query = `CREATE TRIGGER ${nombreTrigger.value}
    ${selectTime.value} ${selectOperation.value}
    ON ${selectDB.value}
    FOR EACH ROW
    EXECUTE PROCEDURE ${selectFunction.value}()`
    console.log(query);
    await dbTriggers.crearTrigger(query)
}

const showTriggers = async () => {
    console.log('Se ejecuto showViews');
    divTriggers.innerHTML = "";
    console.log("Entro a la funcion showTables");
    let query = `
       select event_object_schema as table_schema,
       event_object_table as table_name,
       trigger_schema,
       trigger_name,
       string_agg(event_manipulation, ',') as event,
       action_timing as activation,
       action_condition as condition,
       action_statement as definition
       from information_schema.triggers
       group by 1,2,3,4,6,7,8
       order by table_schema,
         table_name;
    `
    const res = await dbView.selectViews(query)
    console.log(res);
    for (let i = 0; i < res.rowCount; i++) {
        let nuevoCampo = document.createElement("div")
        nuevoCampo.setAttribute("id", "V" + i)
        nuevoCampo.setAttribute("class", "div-tablas")

        let spanNombre = document.createElement("span")
        spanNombre.setAttribute("class", "span-campo")
        spanNombre.setAttribute("id", "span-nombrev" + i)
        spanNombre.textContent = res.rows[i].trigger_name

        let divBtn = document.createElement("div")

        let btnEliminar = document.createElement("button")
        btnEliminar.setAttribute("class", "btn btn-danger btn-table")
        btnEliminar.setAttribute("id", 'V' + i)
        btnEliminar.setAttribute("data-id", res.rows[i].table_name)
        btnEliminar.textContent = "Eliminar"
        btnEliminar.addEventListener('click', e => {
            //Con esto obtengo el ID del boton de obteniendo su atributo id
            console.log(btnEliminar.getAttribute("id"));
            //Aca hago lo mismo pero usando el evento y moviendome entre sus datos
            let id = "span-nombrev" + (e.path[0].id).substr(1);
            console.log(id);
            let divEliminar = document.querySelector(`[id="${id}"]`)
            console.log(divEliminar.textContent);
            console.log(btnEliminar.getAttribute('data-id'));
            eliminarTrigger(divEliminar.textContent,btnEliminar.dataset.id);
        })

        divTriggers.insertAdjacentElement("beforeend", nuevoCampo)
        nuevoCampo.insertAdjacentElement("beforeend", spanNombre)
        nuevoCampo.insertAdjacentElement("beforeend", divBtn)
        divBtn.insertAdjacentElement("beforeend", btnEliminar)
    }
}

const eliminarTrigger = (trigger,tabla) => {
    query = `DROP TRIGGER IF EXISTS ${trigger} 
    ON ${tabla} CASCADE;`;
    console.log(query);
    dbTriggers.DROPTriggers(query,trigger)
}