const storage = require('../JS/local')
const connection = require('../connection')
const dbEditarTablas = require('../SQL/bdEditarTabla')
const { getStorage } = require("../JS/local");

/*texto*/

const encabezadoDB = document.getElementById('encabezadoDB')

/*Tabla*/

const tbody = document.getElementById('tbody');

/*Variables*/

let tablaName = getStorage("tabla").nombre

/*Botones*/

const nuevoCampo = document.getElementById('btn-add-campo')
const crearForeignKey = document.getElementById('btn-add-foreign-key')

/*Selects*/

const tablaForanea = document.getElementById('tablaForanea')
const campoForaneo = document.getElementById('campoForaneo')

document.addEventListener('DOMContentLoaded', e => {
    encabezado();
    cargarCamposTabla();
})

const encabezado = () => {
    encabezadoDB.innerHTML += `${storage.getStorage("DBselected").db}/${storage.getStorage("tabla").nombre}`
}

backIndex.addEventListener('click', e => {
    let DBselected = {
        db: storage.getStorage("DBselected").db,
        online: true
    }
    storage.setStorage("DBselected", DBselected)
    location.href = 'index.html'
})

const cargarCamposTabla = async () => {
    let fk = ""
    let primaryKey = ""
    let foreignKey = ""
    tbody.innerHTML = "";
    let query = `SELECT col.column_name AS nombre,
    col.data_type AS tipo,
    col.character_maximum_length AS max_length,
    col.is_nullable AS null,
    col.column_default As default_data
    FROM information_schema.columns col
    WHERE col.table_name = '${tablaName}'
    ORDER BY col.column_name`;

    let queryPrimaryKey = `SELECT tc.table_name,
    tc.constraint_type,
    kcu.column_name
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_catalog = kcu.constraint_catalog
    AND tc.constraint_schema = kcu.constraint_schema
    AND tc.constraint_name = kcu.constraint_name
    WHERE lower(tc.constraint_type) in ('foreign key', 'primary key')
    AND tc.table_name = '${tablaName}'
    AND tc.constraint_type = 'PRIMARY KEY'`

    let queryForeignKey = `SELECT tc.table_name,
    tc.constraint_type,
    kcu.column_name
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_catalog = kcu.constraint_catalog
    AND tc.constraint_schema = kcu.constraint_schema
    AND tc.constraint_name = kcu.constraint_name
    WHERE lower(tc.constraint_type) in ('foreign key', 'primary key')
    AND tc.table_name = '${tablaName}'
    AND tc.constraint_type = 'FOREIGN KEY'`

    const res = await dbEditarTablas.obtenerCamposTabla(query);
    console.log(res.rowCount);
    if (res.rowCount!=0) {
        const primarykeyTabla = await dbEditarTablas.consultPrimariKey(queryPrimaryKey);
        if (primarykeyTabla.rowCount!=0) {
            primaryKey = primarykeyTabla.rows[0].column_name;
        }
        const foreignkeyTabla = await dbEditarTablas.consultPrimariKey(queryForeignKey);
        foreignKey = foreignkeyTabla.rows;
    }
    
    console.log(foreignKey);
    console.log(res.rows);
    res.rows.forEach((e) => {
        foreignKey.forEach(efk => {
            console.log(e.nombre);
            console.log(efk.column_name);
            if (fk != "✓") {
                if (e.nombre == efk.column_name) {
                    fk = "✓";
                } else {
                    fk = "X";
                }
            }
        });
        if(foreignKey.length==0){
            fk="X"
        }
        console.log('Foreign key: '+fk);
        console.log("entro al for");
        tbody.innerHTML += `<tr>
    <td>
        ${e.nombre}
    </td>
    <td>
        ${e.tipo}
    </td>
    <td>
        ${e.max_length}
    </td>
    <td>
        ${e.null}
    </td>
    <td>
    ${e.default_data}
    </td>
    <td>
    ${comprobarKey(e.nombre,primaryKey)}
    </td>
    <td>
    ${fk}
    </td>
    <td>
        <button id="${e.nombre}" class="btn btn-danger eliminar-campo">Eliminar</button>
    </td>
    </tr>`;
    fk = "X";
    });
    fillFieldsForeignKey();

}

const comprobarKey = (nombre,key) => {
        if (nombre == key) {
            return "✓";
        } else {
            return "X";
        }
}

tbody.addEventListener('click', e => {
    let nombreCampo = e.path[0].id
    if (nombreCampo != "") {
        let query = `alter table ${tablaName} drop ${nombreCampo} CASCADE`
        dbEditarTablas.DROPCampo(query)
        console.log("Preciono el boton");
    } else {
        console.log("No preciono el boton");
    }
})

nuevoCampo.addEventListener('click', e => {
    addCampo()
})

const addCampo = () => {
    let queryAddColumn = `ALTER TABLE ${tablaName} ADD COLUMN `;
    let queryUpdateColumn = `ALTER TABLE ${tablaName} ALTER COLUMN`
    let nombreDatosFull = true
    let tipoDatoFull = true
    let LV = ""
    let notNull = ""
    let dfData = ""
    let primarykey = ""
    let nombreCampo = document.querySelector(`[id="input"]`)
    let selectDato = document.querySelector(`[id="selectDato"]`)
    let longitudValores = document.querySelector(`[id="inputVL"]`)
    let checkNull = document.querySelector(`[id="checkNull"]`)
    let defaultData = document.querySelector(`[id="inputDefault"]`)
    let radioTipoDato = document.querySelector(`[id="primarykey"]`)

    if (nombreCampo.value == "" || nombreDatosFull == false) {
        nombreDatosFull = false
    } else {
        if (selectDato.value == "" || tipoDatoFull == false) {
            tipoDatoFull = false
        }
    }
    if (nombreDatosFull == false) {
        Toast.fire({
            icon: 'info',
            title: 'Coloca el nombre del campo',
            background: 'FFFF',
            width: 420,
            timer: 4000,
        })
    } else {
        if (tipoDatoFull == false) {
            Toast.fire({
                icon: 'info',
                title: 'Selecciona el tipo de dato',
                background: 'FFFF',
                width: 420,
                timer: 4000,
            })
        } else {
            if (longitudValores.value != "") {
                console.log("Entro al if de la longitud de valores");
                console.log(longitudValores.value);
                LV = `(${longitudValores.value})`
            } else {
                LV = ""
            }
            queryAddColumn += `${nombreCampo.value} ${selectDato.value}${LV}`
            console.log(queryAddColumn);

            dbEditarTablas.addColumn(queryAddColumn)
            if (checkNull.checked) {
                console.log("El checkButton esta seleccionado");
                notNull = queryUpdateColumn + ` ${nombreCampo.value} SET NOT NULL`
                console.log(notNull);
                dbEditarTablas.alterColumn(notNull)
            }

            if (defaultData.value != "") {
                dfData = queryUpdateColumn + ` ${nombreCampo.value} SET DEFAULT ${defaultData.value}`
                console.log(dfData);
                dbEditarTablas.alterColumn(dfData)
            }

            if (radioTipoDato.checked) {
                console.log("El RadioButton esta seleccionado");
                primarykey = `ALTER TABLE ${tablaName} ADD PRIMARY KEY (${nombreCampo.value})`
                console.log(primarykey);
                dbEditarTablas.alterColumn(primarykey)
            }
            cargarCamposTabla()
        }
    }
}

const getPrimaryKey = async (tabla) => {
    let primaryKey = ""
    let queryPrimaryKey = `SELECT tc.table_name,
    tc.constraint_type,
    kcu.column_name
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_catalog = kcu.constraint_catalog
    AND tc.constraint_schema = kcu.constraint_schema
    AND tc.constraint_name = kcu.constraint_name
    WHERE lower(tc.constraint_type) in ('foreign key', 'primary key')
    AND tc.table_name = '${tabla}'
    AND tc.constraint_type = 'PRIMARY KEY'`
    const primarikeyTabla = await dbEditarTablas.consultPrimariKey(queryPrimaryKey);
    if (primarikeyTabla.rowCount!=0) {
        primaryKey = primarikeyTabla.rows[0].column_name;
    }
    return primaryKey
}


const fillFieldsForeignKey = async () => {

    let queryForeignTables = `SELECT tc.table_name,
    tc.constraint_type,
    kcu.column_name
    FROM information_schema.table_constraints tc
    LEFT JOIN information_schema.key_column_usage kcu
    ON tc.constraint_catalog = kcu.constraint_catalog
    AND tc.constraint_schema = kcu.constraint_schema
    AND tc.constraint_name = kcu.constraint_name
    WHERE lower(tc.constraint_type) in ('foreign key', 'primary key')
    AND tc.constraint_type = 'PRIMARY KEY' AND tc.table_name<>'${tablaName}'`
    let queryForeignField = `select column_name from information_schema.columns col where table_name = '${tablaName}'`
    const tablasForaneas = await dbEditarTablas.obtenerCamposTabla(queryForeignTables);
    const camposTabla = await dbEditarTablas.obtenerCamposTabla(queryForeignField);
    tablaForanea.innerHTML = ""
    campoForaneo.innerHTML = ""
    console.log(tablasForaneas.rows);
    console.log(camposTabla.rows);
    tablasForaneas.rows.forEach(e => {
        let option = document.createElement("option");
        option.setAttribute("value", e);
        let optionTexto = document.createTextNode(e.table_name);
        option.appendChild(optionTexto);
        tablaForanea.appendChild(option)
    });
    camposTabla.rows.forEach(e => {
            primari = getPrimaryKey(tablaName).then(v=>{
            if (v!=e.column_name) {
                let option = document.createElement("option");
                option.setAttribute("value", e);
                let optionTexto = document.createTextNode(e.column_name);
                option.appendChild(optionTexto);
                campoForaneo.appendChild(option)
            }
        })
    });
}

crearForeignKey.addEventListener('click', e => {
    let foreignTable = tablaForanea.options[tablaForanea.selectedIndex].text;
    let foreignField = campoForaneo.options[campoForaneo.selectedIndex].text;
    console.log(foreignTable);
    console.log(foreignField);
    let queryAddForeignKey = ""
    primari = getPrimaryKey(foreignTable).then(v=>{
        queryAddForeignKey = `ALTER TABLE "${tablaName}" ADD CONSTRAINT "${foreignField}_FK" FOREIGN KEY ("${foreignField}")
        REFERENCES "${foreignTable}" ("${v}") ON UPDATE CASCADE ON DELETE CASCADE`
        console.log(queryAddForeignKey);
        dbEditarTablas.addForeignKey(queryAddForeignKey)
    })
    cargarCamposTabla()
})